import { AUTH_API } from "../API/api.js";

export async function userRegistration(userData) {
  try {
    const response = await fetch(`${AUTH_API}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Something went wrong(Registration)");

    console.info("User successfully registered", data.user);
    return data;
  } catch (err) {
    console.error("Registration Error 🚨", err.message);
    throw err;
  }
}

export async function userLogin(userData) {
  try {
    const response = await fetch(`${AUTH_API}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Something went wrong(Login)");

    // ✅ Save user and token
    localStorage.setItem("authToken", data.token); // Saving the token in localstorage
    localStorage.setItem("authUser", JSON.stringify(data.user)); // Contains name, email, id, role

    console.info("✅ Logged in: ", data.user);
    return data;
  } catch (err) {
    console.error("Login Error 🚨", err.message);
    throw err;
  }
}

export async function getLoggedUser() {

  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const response = await fetch(`${AUTH_API}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;

  const data = await response.json();
  
  return data; // Should contain role, id, etc,..
}
