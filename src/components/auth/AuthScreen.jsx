// components/auth/AuthScreen.jsx
import { useState, useEffect } from "react";
import { DEV_PHONE, DEV_CODE, DEV_TOKEN } from "../../config";
import { api } from "../../utils/api";
import { Error } from "../shared/Error";
import { Button } from "../shared/Button";
import { Input } from "../shared/Inputs";
import { Icons } from "../shared/Icons";

export function AuthScreen({ onAuth }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("+7");
  const [confId, setConfId] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ttl, setTtl] = useState(0);

  useEffect(() => {
    if (ttl <= 0) return;
    const t = setTimeout(() => setTtl((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [ttl]);

  const onPhoneChange = (value) => {
    let v = value.replace(/[^\d+]/g, "");
    if (!v.startsWith("+7")) v = "+7" + v.replace(/\D/g, "");
    v = "+7" + v.slice(2).replace(/\D/g, "").slice(0, 10);
    setPhone(v);
    setError("");
  };

  const send = async (retry = false) => {
    if (phone.replace(/\D/g, "").length < 11) {
      setError("Введите полный номер в формате +7XXXXXXXXXX");
      return;
    }
    if (phone === DEV_PHONE) {
      setStep("code");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const d = await api.confirmPhone(phone, retry);
      setConfId(d.id);
      setTtl(d.codeLifeTimeSec || 60);
      setStep("code");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (!code || code.length < 4) {
      setError("Введите код из SMS");
      return;
    }
    if (phone === DEV_PHONE) {
      if (code !== DEV_CODE) {
        setError(`DEV: используйте код ${DEV_CODE}`);
        return;
      }
      onAuth(DEV_TOKEN, phone);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const d = await api.confirmCode(confId, code);
      onAuth(d, phone);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isDev = phone === DEV_PHONE;

  return (
    <div className="auth-container">
      <div className="auth-glow-top" />
      <div className="auth-glow-bottom" />
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand">
            <div className="auth-logo">FH</div>
            <div>
              <div className="auth-title">Fitness House</div>
              <div className="auth-subtitle">CRM · Управление клубами</div>
            </div>
          </div>
        </div>
        {isDev && (
          <div className="text-center mb-8">
            <span className="auth-dev-badge">{Icons.dev} Демо</span>
          </div>
        )}
        <div className={`auth-box ${isDev ? "auth-box--dev" : ""}`}>
          {step === "phone" ? (
            <>
              <div className="auth-heading">Вход</div>
              <div className="auth-description">
                Введите номер телефона — пришлём код подтверждения
              </div>
              <Input
                label="Номер телефона"
                value={phone}
                onChange={onPhoneChange}
                className="input-lg"
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="+7 (___) ___-__-__"
              />
              <Error msg={error} />
              <Button onClick={() => send(false)} loading={loading} className="btn-block mt-8">
                Получить SMS-код
              </Button>
            </>
          ) : (
            <>
              <button
                className="auth-back-btn"
                onClick={() => {
                  setStep("phone");
                  setCode("");
                  setError("");
                }}
              >
                ← {phone}
              </button>
              <div className="auth-heading">Код из SMS</div>
              <div className="auth-description">
                Отправлен на <span style={{ color: "var(--text)", fontWeight: 600 }}>{phone}</span>
              </div>
              <Input
                label="Код подтверждения"
                value={code}
                onChange={(v) => {
                  setCode(v.replace(/\D/g, "").slice(0, 6));
                  setError("");
                }}
                className="input-lg auth-code-input"
                maxLength={6}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && verify()}
                placeholder="• • • • • •"
              />
              <Error msg={error} />
              <Button onClick={verify} loading={loading} className="btn-block mt-8 mb-12">
                Войти
              </Button>
              <div className="auth-resend">
                {ttl > 0 ? (
                  <span style={{ color: "var(--muted)" }}>Повторный код через {ttl} с.</span>
                ) : (
                  <button className="auth-resend-btn" onClick={() => send(true)}>
                    Отправить повторно
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}