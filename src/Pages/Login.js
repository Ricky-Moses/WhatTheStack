import { userLogin } from "../Config/auth.js";
import Home from "./Home.js";
import Register from "./Register.js";

const root = document.getElementById("root");
const Login = () => {
  const section = document.createElement("section");
  section.className = "login-section";

  section.innerHTML = `
    <div class="login-auth_section">
      <figure>
      <img src="./public/auth.png" />
      </figure>
      <h1 class="login-title"> Welcome Comrade! <br /> <span> User </span> </h1>
      <form id="submitLogin">
        <div class="login-user email">
          <input type="email" name="email" placeholder="User email" required />
          <i class="fa-solid fa-envelope"></i>
        </div>
        <div class="login-user password">
          <input type="password" name="password" placeholder="*******" required />
          <i class="fa-solid fa-key"></i>
        </div>
        <div class="login-user_store">
          <div class="">
            <input type="checkbox" id="check" />
            <label for="check"> Remember Me </label>
          </div>
          <p> <a href=""> Forget Password ? </a> </p>
        </div>
        <div class="login-user_submit">
          <input type="submit" value="Login" />
        </div>
        <div class="login-user_register">
          <label> Are you member yet? </label>
          <input type="button" value="Sign Up" id="registerBtn" />
        </div>
        </form>
        <div class="login-user_follow">
          <label> Follow </label>
          <i class="fa-brands fa-linkedin"></i>
          <i class="fa-brands fa-github"></i>
          <i class="fa-solid fa-cloud-arrow-down"></i>
        </div>
    </div>
  `;

  const registerBtn = section.querySelector("#registerBtn");

  function registerSection() {
    // Removing the existing Login page
    const existLogin = document.querySelector(".login-section");
    if (existLogin) root.removeChild(existLogin);

    if (!document.querySelector(".register-section")) {
      root.append(Register());
      localStorage.setItem("registerOpen", "true");
      localStorage.removeItem("loginOpen");
    }
  }

  registerBtn.addEventListener("click", registerSection);

  const loginUser = section.querySelector("#submitLogin");
  // console.info(loginUser);

  async function submitForm(e) {
    e.preventDefault();

    const loginUserData = new FormData(loginUser);
    const userData = {
      email: loginUserData.get("email"),
      password: loginUserData.get("password"),
    };

    try {
      const response = await userLogin(userData);
      alert("✅ Login successfully");
      const existLogin = document.querySelector(".login-section");
      if (existLogin) root.removeChild(existLogin);

      if (!document.querySelector(".home-section")) {
      root.append(Home());
      localStorage.setItem("homeOpen", "true");
      localStorage.removeItem("loginOpen");
      window.location.reload();
    }
      loginUser.reset();
    } catch (err) {
      console.error(`❌ ${err.message}`);
      alert(`❌ Registration failed! ${err.message}`);
    }
  }

  loginUser.addEventListener("submit", submitForm);

  return section;
};

export default Login;
