import { ADMIN_AUTH_API } from "../../API/api.js";

// All stacks
async function allStacks() {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No auth token found. Returning null.");
      return null;
    }

    const response = await fetch(`${ADMIN_AUTH_API}/all-stacks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch stacks");
    }

    return data;
  } catch (err) {
    console.error("🚨 Admin error:", err.message);
    return null;
  }
}

export default allStacks;
