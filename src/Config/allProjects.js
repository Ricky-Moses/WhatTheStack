import { ALL_PROJECTS } from "../API/api.js";

export async function getAllProjects() {
  try {
    const response = await fetch(`${ALL_PROJECTS}/all-projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not okay
    if (!response.ok) {
      const errorData = await response.json(); // Grab error message
      throw new Error(errorData.message || "Failed to fetch projects");
    }

    const data = await response.json();
    // console.info("Fetched Projects:", data);
    return data;
  } catch (err) {
    // console.error("Fetch Error:", err.message);
    return null;
  }
}
