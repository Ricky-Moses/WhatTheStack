const hostname = location.hostname;

let BASE_URL;

if (hostname === "localhost" || hostname === "127.0.0.1" || /^192\.168\./.test(hostname)) {
  BASE_URL = "http://localhost:5000/api"; // Local dev
} else {
  BASE_URL = "https://your-production-api-url.com/api"; // Production
}

export const AUTH_API = `${BASE_URL}`;
export const ADMIN_AUTH_API = `${BASE_URL}/admin`;
export const ALL_PROJECTS = `${BASE_URL}`;
