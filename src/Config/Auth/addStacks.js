import { ADMIN_AUTH_API } from "../../API/api.js";

// Add stacks
async function addTechStacks(newStacks) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No auth token found. Returning null.");
      return null;
    }

    const response = await fetch(`${ADMIN_AUTH_API}/add-stacks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ techStacks: [newStacks.trim()] }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add stacks");
    }

    return data;
  } catch (error) {
    console.error("🚨 Admin error:", err.message);
    return null;
  }
}

export default addTechStacks