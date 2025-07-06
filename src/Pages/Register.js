import { userRegistration } from "../Config/auth.js";
import Login from "./Login.js";

const root = document.getElementById("root");

const Register = () => {
  const section = document.createElement("section");
  section.className = "register-section";

  section.innerHTML = `
    <div class="register-auth_section">
      <figure>
        <img src="./public/auth.png" />
      </figure>
      <h1 class="register-title"> Welcome Comrade! <br /> <span> User </span> </h1>
      <form id="submitRegisterForm">
        <div class="name-container">
          <div class="register-user name">
            <input type="text" class="first-name" name="firstName" placeholder="First Name" required />
            <i class="fa-solid fa-user"></i>
          </div>
          <div class="register-user name">
            <input type="text" class="last-name" name="lastName" placeholder="Last Name" />
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
        <div class="register-user email">
          <input type="email" name="email" placeholder="Enter email" required />
          <i class="fa-solid fa-envelope"></i>
        </div>
        <div class="register-user password">
          <input type="password" name="password" placeholder="Enter password" required />
          <i class="fa-solid fa-key"></i>
        </div>
        <div class="register-user password">
          <input type="password" name="confirmPassword" placeholder="Re-Enter password" required />
          <i class="fa-solid fa-brain"></i>
        </div>
        <div class="register-user_submit">
          <input type="submit" value="register" />
        </div>
        <div class="register-user_login">
          <label> If already member ? </label>
          <input type="button" value="Sign In" id="loginBtn" />
        </div>
        </form>
        <div class="register-user_follow">
          <label> Follow </label>
          <i class="fa-brands fa-linkedin"></i>
          <i class="fa-brands fa-github"></i>
          <i class="fa-solid fa-cloud-arrow-down"></i>
        </div>
    </div>
  `;

  const loginBtn = section.querySelector("#loginBtn");

  function loginSection() {
    const existRegister = document.querySelector(".register-section");
    if (existRegister) root.removeChild(existRegister);

    if (!document.querySelector(".login-section")) {
      root.append(Login());
      localStorage.setItem("loginOpen", "true");
      localStorage.removeItem("registerOpen");
    }
  }

  loginBtn.addEventListener("click", loginSection);

  const registerUser = section.querySelector("#submitRegisterForm");
  // console.info(form);

  async function submitForm(e) {
    e.preventDefault();

    const newFormData = new FormData(registerUser);
    const password = newFormData.get("password");
    const confirmPassword = newFormData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("🚨 Password does not match!");
    }

    const userData = {
      firstName: newFormData.get("firstName"),
      lastName: newFormData.get("lastName"),
      email: newFormData.get("email"),
      password,
    };

    try {
      const response = await userRegistration(userData);
      alert("✅ Registration successfully");
      registerUser.reset();
    } catch (err) {
      console.error(`❌ ${err.message}`);
      alert(`❌ Registration failed! ${err.message}`);
    }
  }

  registerUser.addEventListener("submit", submitForm);

  return section;
};

export default Register;
