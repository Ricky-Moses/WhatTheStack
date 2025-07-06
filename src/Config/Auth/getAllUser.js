import { ADMIN_AUTH_API } from "../../API/api.js";

// Get all user
async function getAllUserForAdmin() {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No auth token found. Returning null.");
      return null;
    }

    const response = await fetch(`${ADMIN_AUTH_API}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch admin users");
    }

    // console.info("👑 Admin users fetched:", data);
    return data;
  } catch (err) {
    console.error("🚨 Admin error:", err.message);
    return null;
  }
}

export default getAllUserForAdmin;