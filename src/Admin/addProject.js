import addProjectForAdmin from "../Config/Auth/addProjects.js";
import addTechStacks from "../Config/Auth/addStacks.js";
import allStacks from "../Config/Auth/allStacks.js";
import updateProject from "../Config/Auth/updateProject.js";
import uploadImg from "../Config/Auth/upload.js";

const addProduct = async (editProject) => {
  const section = document.createElement("section");
  section.className = "add-project-section";

  const techStack = await allStacks();
  const stacks = editProject?.techStacks ? [...editProject.techStacks] : [];
  const persistKey = "addProjectDraft";

  section.innerHTML = `
    <h1> ${editProject ? "Edit" : "Add"} Project </h1>
    <form class="add-project-form" id="submitForm">
      <input type="text" name="title" placeholder="Enter the project title">
      <div class="tech-stack-container">
        <div>
          <select id="selectedStacks">
            <option disabled selected>Select tech stacks </option>
            ${
              techStack && techStack[0]?.techStacks?.length > 0
                ? techStack[0].techStacks
                    .filter((stack) => !stacks.includes(stack))
                    .sort((a, b) => a.localeCompare(b))
                    .map(
                      (stack) => `<option value="${stack}">${stack}</option>`
                    )
                    .join("")
                : ""
            }
          </select>
          <div class="addStatus">
            <button type="button" class="add-stacks"> Add Stacks </button>
            <select id="projectStatus">
              <option disabled selected>Project Status </option>
              <option ${
                editProject?.status === "Finished" ? "selected" : ""
              }>Finished</option>
              <option ${
                editProject?.status === "In Progress" ? "selected" : ""
              }>In Progress</option>
              <option ${
                editProject?.status === "Cancelled" ? "selected" : ""
              }>Cancelled</option>
            </select>
          </div>
        </div>
        <div class="tech-container"></div>
      </div>
      <textarea class="descMain" placeholder="Describe the project"></textarea>
      <div class="describe-user-interface">
        <div>
          <input type="text" name="subTitleOne" placeholder="Describe the project title e.g., User Interface">
          <input type="text" name="projectName" placeholder="Project Name">
          <input type="text" name="projectLink" placeholder="Project Link">
        </div>
        <textarea class="descOne" name="descriptionTwo" placeholder="Describe the project"></textarea>
      </div>
      <div class="describe-server-side">
        <div>
          <input type="text" name="subTitleTwo" placeholder="Describe the project title e.g., Server-side">
          <input type="text" name="platFormName" placeholder="Version control Link e.g., Github, Vercel...">
          <input type="text" name="portfolioLink" placeholder="Version control Link e.g., Github, Vercel...">
        </div>
        <textarea class="descTwo" name="descriptionThree" placeholder="Describe the project"></textarea>
      </div>
      <div class="image-container">
        <input type="file" accept="image/*" id="projectImage" multiple>
        <span class="image-preview"></span>
      </div>
      <div class="reset-submit-btn">
        <input type="submit" value="${editProject ? "Update" : "Submit"}">
        <input type="reset" value="Reset" id="resetForm">
      </div>
    </form>
  `;

  const submitForm = section.querySelector("#submitForm");
  const fileInput = section.querySelector("#projectImage");
  const selectedStacks = section.querySelector("#selectedStacks");
  const techContainer = section.querySelector(".tech-container");
  const imagePreview = section.querySelector(".image-preview");
  const addStacks = section.querySelector(".add-stacks");
  const reset = section.querySelector("#resetForm");
  const uploadedImages = new Set();

  const savedForm = editProject
    ? editProject
    : JSON.parse(localStorage.getItem(persistKey));

  if (savedForm) {
    submitForm.title.value = savedForm.title || "";
    submitForm.projectName.value = savedForm.projectName || "";
    submitForm.platFormName.value = savedForm.platFormName || "";
    submitForm.querySelector(".descMain").value = savedForm.description || "";
    submitForm.subTitleOne.value = savedForm.subTitleOne || "";
    submitForm.querySelector(".descOne").value = savedForm.descriptionTwo || "";
    submitForm.subTitleTwo.value = savedForm.subTitleTwo || "";
    submitForm.querySelector(".descTwo").value =
      savedForm.descriptionThree || "";
    submitForm.portfolioLink.value = savedForm.portfolioLink || "";
    submitForm.projectLink.value = savedForm.projectLink || "";
    submitForm.querySelector("#projectStatus").value = savedForm.status || "";

    if (Array.isArray(savedForm.techStacks)) {
      savedForm.techStacks.forEach((stack) => {
        if (!stacks.includes(stack)) stacks.push(stack);
      });
      updateTechContainer();
    }

    if (Array.isArray(savedForm.images)) {
      savedForm.images.forEach((imgObj) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "image-wrapper";
        const img = document.createElement("img");
        img.src = typeof imgObj === "string" ? imgObj : imgObj.img || imgObj;
        img.alt = "Preview Img";
        uploadedImages.add(img.src); // Add image source to uploadedImages
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "remove-img";
        deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(deleteBtn);
        imagePreview.appendChild(imageWrapper);

        deleteBtn.addEventListener("click", () => {
          uploadedImages.delete(img.src);
          imageWrapper.remove();
          fileInput.value = "";
        });
      });
    }
  }

  function updateTechContainer() {
    techContainer.innerHTML = stacks
      .map(
        (stack, idx) => `
        <label class="stack-label">
          <input type="checkbox" checked value="${stack}" data-index="${idx}" />
          ${stack}
          <button type="button" class="remove-stack" data-value="${stack}">x</button>
        </label>
      `
      )
      .join("");

    techContainer.querySelectorAll(".remove-stack").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const value = e.target.dataset.value;
        const index = stacks.indexOf(value);
        if (index !== -1) {
          stacks.splice(index, 1);
          updateTechContainer();
        }
      })
    );

    // Update select options to exclude already selected stacks
    const availableStacks =
      techStack && techStack[0]?.techStacks?.length > 0
        ? techStack[0].techStacks
            .filter((stack) => !stacks.includes(stack))
            .sort((a, b) => a.localeCompare(b))
        : [];
    selectedStacks.innerHTML = `
      <option disabled selected>Select tech stacks </option>
      ${availableStacks
        .map((stack) => `<option value="${stack}">${stack}</option>`)
        .join("")}
    `;
  }

  function imageInput(e) {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file &&
        file.type.startsWith("image/") &&
        !uploadedImages.has(file.name)
      ) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imageWrapper = document.createElement("div");
          imageWrapper.className = "image-wrapper";
          const img = document.createElement("img");
          img.src = event.target.result;
          img.alt = "Preview Img";
          const deleteBtn = document.createElement("button");
          deleteBtn.type = "button";
          deleteBtn.className = "remove-img";
          deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
          imageWrapper.appendChild(img);
          imageWrapper.appendChild(deleteBtn);
          imagePreview.appendChild(imageWrapper);
          uploadedImages.add(file.name);
          deleteBtn.addEventListener("click", () => {
            uploadedImages.delete(file.name);
            imageWrapper.remove();
            fileInput.value = "";
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function selectedTechStacks(e) {
    const selected = e.target.value;
    if (!stacks.includes(selected)) {
      stacks.push(selected);
      updateTechContainer();
    }
    e.target.value = ""; // Reset select dropdown
  }

  function resetFormData() {
    if (localStorage.getItem("editingProject")) {
      if (confirm("Do you want to remove edit mode?")) {
        localStorage.removeItem("editingProject");
        localStorage.removeItem(persistKey);
        window.location.reload();
      }
    } else {
      imagePreview.innerHTML = "";
      uploadedImages.clear();
      fileInput.value = "";
      submitForm.reset();
      stacks.length = 0;
      updateTechContainer();
      localStorage.removeItem(persistKey);
    }
  }

  async function addNewStacks() {
    const addStack = prompt("Enter the new tech stack: ");
    if (!addStack || addStack.trim() === "") return;
    const result = await addTechStacks(addStack);
    if (result) {
      alert("Stack added!");
      window.location.reload();
    } else {
      alert("Failed to add stack.");
    }
  }

  let debounceTimer;
  submitForm.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const formState = {
        title: submitForm.title.value,
        projectName: submitForm.projectName.value,
        platFormName: submitForm.platFormName.value,
        description: submitForm.querySelector(".descMain").value,
        subTitleOne: submitForm.subTitleOne.value,
        descriptionTwo: submitForm.querySelector(".descOne").value,
        subTitleTwo: submitForm.subTitleTwo.value,
        descriptionThree: submitForm.querySelector(".descTwo").value,
        portfolioLink: submitForm.portfolioLink.value,
        projectLink: submitForm.projectLink.value,
        status: submitForm.querySelector("#projectStatus").value,
        techStacks: stacks,
        images: Array.from(imagePreview.querySelectorAll("img")).map(
          (img) => img.src
        ),
      };
      localStorage.setItem(persistKey, JSON.stringify(formState));
    }, 400);
  });

  async function handleSubmitForm(e) {
    e.preventDefault();

    const files = Array.from(fileInput.files);
    let uploaded = editProject ? editProject.images || [] : [];

    if (files.length > 0) {
      const newImages = await uploadImg(files);
      if (!newImages) {
        return alert("Image upload failed. Please try again.");
      }
      uploaded = [...uploaded, ...newImages];
    }

    const formData = {
      title: submitForm.title.value,
      projectName: submitForm.projectName.value,
      platFormName: submitForm.platFormName.value,
      description: submitForm.querySelector(".descMain").value,
      subTitleOne: submitForm.subTitleOne.value,
      descriptionTwo: submitForm.querySelector(".descOne").value,
      subTitleTwo: submitForm.subTitleTwo.value,
      descriptionThree: submitForm.querySelector(".descTwo").value,
      portfolioLink: submitForm.portfolioLink.value,
      projectLink: submitForm.projectLink.value,
      status: submitForm.querySelector("#projectStatus").value,
      techStacks: stacks,
      images: uploaded,
    };

    let result;
    if (editProject && editProject._id) {
      // Update existing project
      result = await updateProject(editProject._id, formData);
      if (result && result.project) {
        alert("Project updated successfully!");
        localStorage.removeItem("editingProject");
        localStorage.removeItem(persistKey);
        window.location.reload();
      } else {
        alert("Failed to update project.");
      }
    } else {
      // Add new project
      const formDataForAdd = new FormData();
      formDataForAdd.append("title", formData.title);
      formDataForAdd.append("projectName", formData.projectName);
      formDataForAdd.append("platFormName", formData.platFormName);
      formDataForAdd.append("description", formData.description);
      formDataForAdd.append("subTitleOne", formData.subTitleOne);
      formDataForAdd.append("descriptionTwo", formData.descriptionTwo);
      formDataForAdd.append("subTitleTwo", formData.subTitleTwo);
      formDataForAdd.append("descriptionThree", formData.descriptionThree);
      formDataForAdd.append("portfolioLink", formData.portfolioLink);
      formDataForAdd.append("projectLink", formData.projectLink);
      formDataForAdd.append("status", formData.status);
      formData.techStacks.forEach((tech) =>
        formDataForAdd.append("techStacks", tech)
      );
      formDataForAdd.append("images", JSON.stringify(formData.images));

      result = await addProjectForAdmin(formDataForAdd);
      if (result && result.project) {
        alert("Project added successfully!");
        localStorage.removeItem("editingProject");
        localStorage.removeItem(persistKey);
        window.location.reload();
      } else {
        alert("Failed to add project.");
      }
    }
  }

  submitForm.addEventListener("submit", handleSubmitForm);
  addStacks.addEventListener("click", addNewStacks);
  reset.addEventListener("click", resetFormData);
  fileInput.addEventListener("change", imageInput);
  selectedStacks.addEventListener("change", selectedTechStacks);

  return section;
};

export default addProduct;
