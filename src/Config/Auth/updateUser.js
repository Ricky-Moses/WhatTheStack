import { ADMIN_AUTH_API } from "../../API/api.js";

// Update the user
async function updateUser(userId, updateData) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No auth token found. Returning null.");
      return null;
    }

    const response = await fetch(`${ADMIN_AUTH_API}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update user");
    }

    // console.info("👑 Admin update user:", data);
    return data;
  } catch (err) {
    console.error("🚨 Admin error:", err.message);
    return null;
  }
}

export default updateUser;
