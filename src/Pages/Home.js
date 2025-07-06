import { getAllProjects } from "../Config/allProjects.js";
import Project from "./Project.js";

const root = document.getElementById("root");

const Home = async () => {
  const section = document.createElement("section");
  section.className = "home-section";

  const listOfProjects = await getAllProjects();
  section.innerHTML =
    listOfProjects && listOfProjects.length > 0
      ? listOfProjects
          .map((project, idx) => {
            const hasImages = Array.isArray(project.images) && project.images.length > 0;
            const firstImage = hasImages && project.images[0]?.img
              ? project.images[0].img
              : `https://picsum.photos/500/300?random=${idx + 1}`;
            const altText = hasImages && project.images[0]?.altText
              ? project.images[0].altText
              : `Project ${project.title} Image`;

            return `
              <figure class="projectPage" data-idx="${idx}">
                <img class="project-img" src="${firstImage}" alt="${altText}" />
                <figcaption>
                  <h3>${project.title} (${project.status})</h3>
                  <p>${project.description}</p>
                </figcaption>
              </figure>
            `;
          })
          .join("")
      : "📽️ Oops! No projects here yet.";

  const projectPage = section.querySelectorAll(".projectPage");

  projectPage.forEach((projectEl) => {
    const idx = +projectEl.dataset.idx;
    const imgEl = projectEl.querySelector(".project-img");

    // Preload image to ensure it loads correctly
    const preloadImg = new Image();
    preloadImg.src = imgEl.src;
    preloadImg.onerror = () => {
      console.error(`Failed to load image: ${imgEl.src}`);
      imgEl.src = `https://picsum.photos/500/300?random=${idx + 1}`;
      imgEl.alt = `Project ${listOfProjects[idx].title} Fallback Image`;
    };

    projectEl.addEventListener("click", () => projectDetails(idx));
  });

  function projectDetails(index) {
    const existHome = document.querySelector(".home-section");
    if (existHome) root.removeChild(existHome);

    if (!document.querySelector(".project-section")) {
      localStorage.removeItem("selectedProject");
      localStorage.setItem("selectedProject", JSON.stringify(listOfProjects[index]));

      root.append(Project());
      localStorage.setItem("projectOpen", "true");
      localStorage.removeItem("homeOpen");
    }
  }

  return section;
};

export default Home;