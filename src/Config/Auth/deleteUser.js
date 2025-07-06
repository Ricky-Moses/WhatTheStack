import { ADMIN_AUTH_API } from "../../API/api.js";

// Delete user
async function deleteUserData(userId) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No auth token found. Returning null.");
      return null;
    }

    const response = await fetch(`${ADMIN_AUTH_API}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete user");
    }

    // console.info("👑 Admin delete user:", data);
    return data;
  } catch (err) {
    console.error("🚨 Admin error:", err.message);
    return null;
  }
}

export default deleteUserData;
