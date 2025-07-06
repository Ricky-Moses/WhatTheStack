import { getAllProjects } from "../Config/allProjects.js";
import deleteTheProject from "../Config/Auth/deleteProject.js";

const allProject = async () => {
  const section = document.createElement("section");
  section.className = "all-project-section";

  const projectList = await getAllProjects();
  // console.log(projectList)
  section.innerHTML = `
  <div class="table-wrapper">
    ${
      projectList && projectList.length > 0
        ? `<table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Date</th>
          <th>Project Name</th>
          <th>Status</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${projectList
          .map((list, idx) => {
            return `
            <tr data-index="${idx}">
              <td>${idx + 1}</td>
              <td>${new Date(list.createdAt).toLocaleDateString()}</td>
              <td>${list.projectName}</td>
              <td>${list.status}</td>
              <td><button class="edit-btn">Edit</button></td>
              <td><button class="delete-btn" data-id="${
                list._id
              }">Delete</button></td>
            </tr>
          `;
          })
          .join("")}
      </tbody>
    </table>`
        : "📽️ Oops! No projects here yet."
    }
  </div>
`;

  section.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const tr = e.target.closest("tr");
      const index = tr.dataset.index;
      const project = projectList[index];

      if (confirm("Do you want to enter in edit mode!")) {
        localStorage.setItem("editingProject", JSON.stringify(project));
        window.location.reload();
      }
    }
  });

  // Delete the project
  const deleteBtn = section.querySelectorAll(".delete-btn");

  async function deleteBlock(e) {
    const deleteId = e.target.dataset.id;
    // console.info(deleteId)

    const deletedProject = await deleteTheProject(deleteId);

    if (deletedProject) {
      const projectData = projectList.find(
        (project) => project._id === deleteId
      );
      alert(`Project ${projectData?.projectName} deleted successfully`);
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  }

  deleteBtn.forEach((btn) => btn.addEventListener("click", deleteBlock));
  return section;
};

export default allProject;
