import Home from "../Pages/Home.js";
import Login from "../Pages/Login.js";
import userAdminSection from "./userAdmin.js";

const root = document.getElementById("root");

const Header = () => {
  const header = document.createElement("header");

  // Authentication
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  // Header
  header.innerHTML = `
        <h1 class="header-project_name" id="headerHomePage"> 
          <a href="/home">WhatTheStack...</a>
        </h1>
        <nav>
            <a href="#" class="header-user_name" id="userAdmin">
                <i class="fa-solid fa-user-tie"></i>
                <label> ${authUser ? authUser.firstName : "User name"} ${authUser ? authUser.lastName : ""}</label>
            </a>
            ${
              authUser
                ? `<button class="header-btn" id="logoutBtn">  Logout  </button>`
                : `<button class="header-btn" id="loginBtn">  Sign Up / In  </button>`
            }
        </nav>
    `;

  const homePage = header.querySelector("#headerHomePage");
  const loginBtn = header.querySelector("#loginBtn");
  const logoutBtn = header.querySelector("#logoutBtn");
  const userAdmin = header.querySelector("#userAdmin");

  // Login section
  function loginSection(e) {
    e.preventDefault();
    // Removing the existing Home page
    const existHome = document.querySelector(".home-section");
    const existRegister = document.querySelector(".register-section");
    const existProject = document.querySelector(".project-section");
    const existUserAdmin = document.querySelector(".userAdmin-section")
    if (existHome) root.removeChild(existHome);
    else if (existRegister) root.removeChild(existRegister);
    else if (existProject) root.removeChild(existProject);
    else if (existUserAdmin) root.removeChild(existUserAdmin);

    if (!document.querySelector(".login-section")) {
      root.append(Login());
      localStorage.setItem("loginOpen", "true");
      localStorage.removeItem("homeOpen");
      localStorage.removeItem("registerOpen");
      localStorage.removeItem("projectOpen");
      localStorage.removeItem("userAdmin")
      localStorage.removeItem("selectedProject")
    }
  }

  // Home Section
  async function homeSection(e) {
    e.preventDefault();

    // Removing the existing page
    const existLogin = document.querySelector(".login-section");
    const existRegister = document.querySelector(".register-section");
    const existProject = document.querySelector(".project-section");
    const existUserAdmin = document.querySelector(".userAdmin-section");
    if (existLogin) root.removeChild(existLogin);
    else if (existRegister) root.removeChild(existRegister);
    else if (existProject) root.removeChild(existProject);
    else if (existUserAdmin) root.removeChild(existUserAdmin);

    if (!document.querySelector(".home-section")) {
      const homeSection = await Home()
      root.append(homeSection);
      localStorage.setItem("homeOpen", "true");
      localStorage.removeItem("loginOpen");
      localStorage.removeItem("registerOpen");
      localStorage.removeItem("projectOpen");
      localStorage.removeItem("userAdmin")
      localStorage.removeItem("selectedProject")
    }
  }

  // Logout section
  function logoutSection(e) {
    e.preventDefault();

    const existUserAdmin = document.querySelector(".userAdmin-section")
    if(existUserAdmin) root.removeChild(existUserAdmin)

    localStorage.removeItem("authToken"); // Remove the token
    localStorage.removeItem("authUser"); // Remove user details
    localStorage.removeItem("userAdmin")
    localStorage.removeItem("adminPanel")
    localStorage.removeItem("selectedProject")
    window.location.reload(); // Reload where the current page visible
  }

  // User/Admin page
  async function userAdminPage(e) {
    // Removing the existing page
    const existHome = document.querySelector(".home-section");
    const existLogin = document.querySelector(".login-section");
    const existRegister = document.querySelector(".register-section");
    const existProject = document.querySelector(".project-section");

    if (existHome) root.removeChild(existHome);
    else if (existLogin) root.removeChild(existLogin);
    else if (existRegister) root.removeChild(existRegister);
    else if (existProject) root.removeChild(existProject);

    if (!document.querySelector(".userAdmin-section")) {
      const adminSection = await userAdminSection()
      root.append(adminSection);
      localStorage.setItem("userAdmin", "true");
      localStorage.removeItem("homeOpen");
      localStorage.removeItem("loginOpen");
      localStorage.removeItem("registerOpen");
      localStorage.removeItem("projectOpen");
      localStorage.removeItem("selectedProject")
    }
  }

  homePage.addEventListener("click", homeSection);
  if (loginBtn) {
    loginBtn.addEventListener("click", loginSection);
  }
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutSection);
  }
  if (authUser) {
    userAdmin.addEventListener("click", userAdminPage);
  }

  return header;
};

export default Header;
