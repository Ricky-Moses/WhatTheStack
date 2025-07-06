import { ADMIN_AUTH_API } from "../../API/api.js";

async function uploadImg(files) {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No auth token found.");
      return null;
    }

    const formData = new FormData();
    for (let file of files) {
      formData.append("images", file);
    }

    const response = await fetch(`${ADMIN_AUTH_API}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    return data.images; // [{ img, altText }]
  } catch (err) {
    console.error("🚨 Image upload failed:", err.message);
    return null;
  }
}

export default uploadImg