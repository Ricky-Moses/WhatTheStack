import { ADMIN_AUTH_API } from "../../API/api.js";

// Add projects
async function addProjectForAdmin(formData) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No auth token found. Returning null.");
      return null;
    }

    const response = await fetch(`${ADMIN_AUTH_API}/add-project`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add new protect");
    }

    return data;
  } catch (err) {
    console.error("🚨 Admin error:", err.message);
    return null;
  }
}

export default addProjectForAdmin;
