import getAllUserForAdmin from "../Config/Auth/getAllUser.js";
import updateUser from "../Config/Auth/updateUser.js";
import deleteUserData from "../Config/Auth/deleteUser.js";
import { getAllProjects } from "../Config/allProjects.js";

// console.log(userStatus)

const adminPanel = async () => {
  const section = document.createElement("section");
  section.className = "admin-panel-details";

  const userStatus = await getAllUserForAdmin();
  const projectStatus = await getAllProjects();
  // console.log(projectStatus);

  const latestUser = getLatest(userStatus);
  const latestProject = getLatest(projectStatus);
  // console.info(latestUser)
  section.innerHTML = `
    <div class="admin-project_details">
        <div class="user-project-container first-container">
            <div>
                <span> 
                    <h1> No Of Project </h1>
                    <p> Latest Update: ${
                      latestProject
                        ? `${latestProject.projectName} (${new Date(
                            latestProject.createdAt
                          ).toLocaleDateString()})`
                        : "None"
                    } </p>
                </span>
                <span>
                    <h1> ${projectStatus.length} </h1>
                </span>
            </div>
        </div>
        <div class="user-project-container second-container">
            <div>
                <span> 
                    <h1> No Of User </h1>
                    <p> Latest User: ${
                      latestUser
                        ? `${latestUser.firstName} ${
                            latestUser.lastName
                          } (${new Date(
                            latestUser.createdAt
                          ).toLocaleDateString()})`
                        : "None"
                    } </p>
                </span>
                <span>
                    <h1> ${userStatus.length} </h1>
                </span>
            </div>
        </div>
    </div>
    <div class="admin-projectUser_status">
        <div class="recent project">
            <div class="notify-project">
                <h2> Recent Projects </h2>
                <button type="button" data-panel="all"> See all →</button>
            </div>
            ${
              projectStatus && projectStatus.length > 0
                ? `<table>
                <thead>
                    <tr>
                        <th>Project-Title</th>
                        <th>Stacks</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${projectStatus
                      .slice(0, 5)
                      ?.map(
                        (projects) => `
                        <tr>
                            <td>${projects.title}</td>
                            <td class="">${projects.techStacks}</td>
                            <td>${projects.status}</td>
                        </tr>
                        `
                      )
                      .join("")}
                </tbody>
            </table>`
                : "📽️ No project founded"
            }
        </div>
        <div class="recent user">
            <div class="notify-user">
                <h2> User </h2>
                <button type="button"> Add user →</button>
            </div>
            <table>
                <tbody>
                      ${
                        userStatus
                          ? userStatus
                              ?.map(
                                (user, idx) =>
                                  `
                            <tr>
                                <th> #${idx + 1} </th>
                                <td> ${user.firstName} ${user.lastName} </td>
                                <td> 
                                    <select data-id="${
                                      user._id
                                    }" class="role-select">
                                    <option value="admin" ${
                                      user.role.toLowerCase() === "admin"
                                        ? "selected"
                                        : ""
                                    }> Admin </option>
                                        <option value="user" ${
                                          user.role.toLowerCase() === "user"
                                            ? "selected"
                                            : ""
                                        }> User </option>
                                    </select>
                                </td>
                                <td>
                                    <button class="delete-btn"> Delete </button>
                                </td>
                            </tr>
                        `
                              )
                              .join("")
                          : "👤 No user founded!"
                      }
                </tbody>
            </table>
        </div>
    </div>
    `;

  const roleSelect = section.querySelectorAll(".role-select");
  const deleteBtn = section.querySelectorAll(".delete-btn");
  const seeAllProject = section.querySelector('[data-panel="all"]');

  // Updating the user role
  async function changeUserRole(e) {
    const userId = e.target.dataset.id;
    const newRole = e.target.value;

    const result = await updateUser(userId, { role: newRole });

    if (result) {
      const findUser = userStatus.find((user) => user._id === userId);

      const fullName = findUser
        ? `${findUser.firstName} ${findUser.lastName}`
        : "Unknown user";
      alert(`✅ ${fullName} Role is updated to ${newRole}`);
    } else {
      alert("❌ Failed to update role.");
    }
  }

  // Delete the user from database and DOM
  async function deleteUser(e) {
    const row = e.target.closest("tr");
    const userId = row.querySelector(".role-select").dataset.id;

    if (confirm("Are you sure you want to delete this user? 🧨")) {
      const result = await deleteUserData(userId);
      if (result) {
        const findUser = userStatus.find((user) => user._id === userId);

        const fullName = findUser
          ? `${findUser.firstName} ${findUser.lastName}`
          : "Unknown user";
        alert(`✅ User(${fullName}) deleted successfully`);
        row.remove();
      } else {
        alert("❌ Failed to delete user.");
      }
    }
  }

  // Latest user
  function getLatest(user) {
    return user
      ?.slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  }

  // Switch the panel to all Project page
  seeAllProject?.addEventListener("click", () => {
    const event = new CustomEvent("switchPanel", {
      detail: { panel: "all" },
    });
    window.dispatchEvent(event); // This notify the parents
  });

  roleSelect.forEach((select) => {
    select.addEventListener("change", changeUserRole);
  });
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", deleteUser);
  });

  return section;
};

export default adminPanel;
