const Project = () => {
  const section = document.createElement("section");
  section.className = "project-section";

  const projectData = JSON.parse(localStorage.getItem("selectedProject"));
  // console.table(projectData)

  const {
    title,
    images,
    description,
    techStacks,
    projectName,
    projectLink,
    platFormName,
    portfolioLink,
    subTitleOne,
    descriptionTwo,
    subTitleTwo,
    descriptionThree,
  } = projectData;
  // console.table(projectData);

  section.innerHTML = `
    <article>
      <h1>${title}</h1>
      <figure>
        <button class="left-arrow"> <i class="fa-solid fa-arrow-left"></i> </button>
        <img class="auto-project-img" src="${images[0].img}" alt="${
    images[0].altText
  }" />
        <button class="right-arrow"> <i class="fa-solid fa-arrow-right"></i> </button>
      </figure>
      <p class="descOne"><strong>${description}</strong></p>
      <h2> Tech Stacks: ${techStacks
        ?.map((stacks) => `<span>${stacks}</span>`)
        .join(" | ")}</h2>
      ${
        subTitleOne
          ? `<div>
        <h2> ${subTitleOne}: <a style="text-decoration: underline" href="${projectLink}" target="_blank">${projectName}</a> </h2>
        <p class="descTwo"> ${descriptionTwo} </p>
            </div>`
          : ``
      }
      ${
        subTitleTwo
          ? `<div>
        <h2> ${subTitleTwo}: <a style="text-decoration: underline" href="${portfolioLink}" target="_blank">${platFormName}</a> </h2>
        <p class="descThree"> ${descriptionThree} </p>
            </div>`
          : ``
      }
    </article>
  `;

  const imgEl = section.querySelector(".auto-project-img");
  const leftBtn = section.querySelector(".left-arrow");
  const rightBtn = section.querySelector(".right-arrow");

  let currentIndex = 0;

  function updateImgSlide() {
    imgEl.src = images[currentIndex].img;
    imgEl.alt = images[currentIndex].altText;
  }

  leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImgSlide();
  });

  rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImgSlide();
  });

  return section;
};

export default Project;
