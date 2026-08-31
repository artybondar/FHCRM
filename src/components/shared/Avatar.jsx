// components/shared/Avatar.jsx
const PALETTE = ["#E53946", "#2FADD8", "#7B5FE6", "#F09D30", "#22C489", "#E040A8", "#44C878"];

const colorFor = (seed) => {
  const n = String(seed).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return PALETTE[n % PALETTE.length];
};

export function Avatar({ initials, seed, size = 40, statusColor }) {
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `${colorFor(seed)}26`,
          color: colorFor(seed),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: size * 0.38,
        }}
      >
        {initials}
      </div>
      {statusColor && (
        <div
          style={{
            position: "absolute",
            right: -1,
            bottom: -1,
            width: size * 0.3,
            height: size * 0.3,
            borderRadius: "50%",
            background: statusColor,
            border: "2px solid var(--bg-card)",
          }}
        />
      )}
    </div>
  );
}
