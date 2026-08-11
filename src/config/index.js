// config/index.js
export const BASE = import.meta.env.VITE_API_BASE ?? "";
export const DEV_PHONE = "+76661234567";
export const DEV_CODE = "0315";
export const DEV_TOKEN = { 
  accessToken: "dev-access-token", 
  refreshToken: "dev-refresh-token", 
  isPersonLinked: true 
};