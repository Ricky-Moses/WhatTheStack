import { ADMIN_AUTH_API } from "../../API/api.js";

async function deleteTheProject(id) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No auth token found. Returning null.");
      return null;
    }

    const response = await fetch(`${ADMIN_AUTH_API}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete project:", errorData.message);
      return null;
    }

    const result = await response.json();
    return result; // contains { message, project }
  } catch (err) {
    console.error("Error deleting project:", err.message);
    return null;
  }
}

export default deleteTheProject;
