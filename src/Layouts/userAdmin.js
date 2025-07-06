import { getLoggedUser } from "../Config/auth.js";
import Admin from "../Pages/Admin.js";
import User from "../Pages/User.js";

const userAdmin = async () => {
  const section = document.createElement("section");
  section.className = "userAdmin-section";

  try {
    const userData = await getLoggedUser();
    // console.table("User Admin page:", userData);

    // Fallback to User if data is null or doesn't contain 'role'
    const child =
      userData && userData.role === "admin"
        ? await Admin()
        : await User();

    if (child instanceof Node) {
      section.appendChild(child);
      // console.info(child)
    } else {
      // console.warn("Returned element is not a valid DOM Node.", child);
      throw new Error("Returned element is not a valid DOM Node.");
    }
  } catch (err) {
    console.error("❌ Failed to load Admin/User page:", err);
    section.appendChild(
      document.createTextNode("⚠️ Something went wrong loading the panel.")
    );
  }

  return section;
};

export default userAdmin;
