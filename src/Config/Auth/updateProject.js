import { ADMIN_AUTH_API } from "../../API/api.js";

const updateProject = async (id, data) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No auth token found. Returning null.");
      return null;
    }
    const res = await fetch(`${ADMIN_AUTH_API}/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (err) {
    console.error("Update Project Error:", err);
    return null;
  }
};

export default updateProject;
