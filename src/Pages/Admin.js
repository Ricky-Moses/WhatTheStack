import addProject from "../Admin/addProject.js";
import adminPanel from "../Admin/adminPanel.js";
import allProject from "../Admin/allProject.js";

const Admin = async () => {
  const section = document.createElement("section");
  section.className = "admin-section";

  let editProject;
  try {
    editProject = JSON.parse(localStorage.getItem("editingProject")) || null;
  } catch (e) {
    console.error("Failed to parse editingProject:", e);
    editProject = null;
  }

  section.innerHTML = `
    <div class="bar-container"></div>
    <nav class="admin-menu">
        <h2>Dashboard</h2>
        <ul>
            <li data-panel="dashboard">Admin Panel</li>
            <li data-panel="add">${editProject ? "Edit" : "Add"} Project</li>
            <li data-panel="all">All Project</li>
        </ul>
    </nav>
    <div class="admin-panel"></div>
  `;

  const adminPanelContainer = section.querySelector(".admin-panel");
  const adminMenus = section.querySelectorAll(".admin-menu ul li");
  const adminContainer = section.querySelector(".admin-menu");
  const barContainer = section.querySelector(".bar-container");

  const savedPanel = localStorage.getItem("adminPanel") || "dashboard";

  // 🔁 Async call to get component
  const panelComponents = {
    dashboard: await adminPanel(),
    add: await addProject(editProject),
    all: await allProject(),
  };

  adminMenus.forEach((menu) => {
    
    const panelKey = menu.getAttribute("data-panel");
    if (panelKey === savedPanel) {
      menu.classList.add("active");
    }
  });

  const initialPanel = panelComponents[savedPanel];
  if (initialPanel instanceof Node) {
    adminPanelContainer.append(initialPanel);
  } else {
    console.error(`Invalid initial panel for ${savedPanel}:`, initialPanel);
    adminPanelContainer.append(
      document.createTextNode("Error: Invalid panel content 🚫")
    );
  }

  async function adminPanelboard(e) {
    adminMenus.forEach((menu) => menu.classList.remove("active"));

    e.target.classList.add("active");

    adminPanelContainer.innerHTML = "";

    const panelKey = e.target.getAttribute("data-panel");

    // 🔁 Await the right panel again
    const panelMap = {
      dashboard: adminPanel,
      add: () => addProject(editProject),
      all: allProject,
    };

    const panelFn =
      panelMap[panelKey] ||
      (() => document.createTextNode("No content found 🚫"));
    const panelPage = await panelFn?.();

    if (panelPage instanceof Node) {
      adminPanelContainer.append(panelPage);
    } else {
      // console.error(`Invalid panel for ${panelKey}:`, panelPage);
      adminPanelContainer.append(
        document.createTextNode("No content found 🚫")
      );
    }

    localStorage.setItem("adminPanel", panelKey);
  }

  
  function updateBarContainer() {
    if (window.innerWidth <= 992) {
      barContainer.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    } else {
      barContainer.innerHTML = "";
    }
  }

  window.addEventListener("switchPanel", async (e) => {
    const panelKey = e.detail.panel;
    // console.log(panelKey)

    adminMenus.forEach((menu) => menu.classList.remove("active"));

    // set active menu items
    const activeMenu = [...adminMenus].find(
      (menu) => menu.dataset.panel === panelKey
    );

    activeMenu?.classList.add("active");

    adminPanelContainer.innerHTML = "";
    
    const panelMap = {
      dashboard: adminPanel,
      add: () => addProject(editProject),
      all: allProject,
    };
    
    const panelFn = panelMap[panelKey];
    const panelPage = await panelFn();

    if (panelPage instanceof Node) {
      adminPanelContainer.append(panelPage);
    } else {
      // console.error(`Invalid panel for ${panelKey}:`, panelPage);
      adminPanelContainer.append(
        document.createTextNode("No content found 🚫")
      );
    }
  });
  
  updateBarContainer();

  adminMenus.forEach((menu) => menu.addEventListener("click", adminPanelboard));
  
  window.addEventListener("resize", updateBarContainer);
  
  barContainer.addEventListener("click", () => {
    adminContainer.classList.toggle("show-menu");
  });

  return section;
};

export default Admin;
