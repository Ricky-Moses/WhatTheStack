import Header from "./Layouts/Header.js";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Project from "./Pages/Project.js";
import Register from "./Pages/Register.js";
import userAdmin from "./Layouts/userAdmin.js";

const root = document.getElementById("root");

// Home page
async function embedRoot() {
  if (!root) throw new Error("Root element not found");

  const header = Header();
  root.appendChild(header);

  window.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.className = "cursor-ripple";
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 500);
  });

  if (localStorage.getItem("homeOpen") === "true") {
    const homeSection = await Home();
    root.append(homeSection);
  } else if (localStorage.getItem("loginOpen") === "true") {
    root.append(Login());
  } else if (localStorage.getItem("registerOpen") === "true") {
    root.append(Register());
  } else if (localStorage.getItem("projectOpen") === "true") {
    root.append(Project());
  } else if (localStorage.getItem("userAdmin") === "true") {
    const adminSection = await userAdmin();
    root.append(adminSection);
  } else {
    const homeSection = await Home()
    root.append(homeSection);
    localStorage.setItem("homeOpen", "true");
  }
}

embedRoot();
