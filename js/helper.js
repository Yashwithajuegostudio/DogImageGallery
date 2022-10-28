import {
  findElementByClassName,
  querySlecetor,
  currentIndeValue,
} from "./constants";

const previousButtons = findElementByClassName("prev");
const nextButtons = findElementByClassName("next");
const images = findElementByClassName("dog-image");
const maincontainer = querySlecetor("#main-image");
const breedImageContainer = querySlecetor("#image-conatiner");
const selectList = querySlecetor("#selectList");

// slider buttons Functionality
function showSliderChanges(updateCurrentIndex = currentIndeValue) {
  let currentIndex = updateCurrentIndex;
  // previous button functionality
  for (let prevBtn of previousButtons) {
    prevBtn.addEventListener("click", function onClick() {
      removeActiveClass(images);
      let slideCount = images.length - 1;
      images[currentIndex].classList.remove("active");
      let nextImage;

      if (currentIndex === slideCount) {
        nextImage = 0;
      } else {
        nextImage = currentIndex - 1;
      }

      moveSlides(nextImage);
      currentIndex = nextImage;
    });
  }
  // next button functionality
  for (let nextBtn of nextButtons) {
    nextBtn.addEventListener("click", function onClick() {
      removeActiveClass(images);
      let slideCount = images.length - 1;
      images[currentIndex].classList.remove("active");
      let nextImage;
      if (currentIndex === slideCount) {
        nextImage = 0;
      } else {
        nextImage = currentIndex + 1;
      }
      moveSlides(nextImage);
      currentIndex = nextImage;
    });
  }
}
// remove active class
function removeActiveClass(dogImages) {
  for (let image of dogImages) {
    image.classList.remove("active");
  }
}
// toggle slides functionality
function moveSlides(nextImage) {
  images[nextImage].classList.add("active");
  let mainConatinerImage = maincontainer.firstChild;
  mainConatinerImage.src = images[nextImage].src;
}
// drop down functionality
function showDropDown() {
  const customSelectBtn = document.getElementsByClassName("selectCustom")[0];
  const customSelectDefaultValue = customSelectBtn.children[0];
  const customSelectOptions = customSelectBtn.children[1];

  // Toggle select on label click
  customSelectDefaultValue.addEventListener("click", () => {
    Array.from(customSelectOptions.children).forEach(function (option) {
      option.addEventListener("click", (e) => {
        customSelectDefaultValue.textContent = e.target.textContent;
        customSelectBtn.classList.remove("isActive");
      });
    });
    customSelectBtn.classList.toggle("isActive");
  });
  // close the custom select when clicking outside.
  document.addEventListener("click", (e) => {
    const didClickedOutside = !customSelectBtn.contains(e.target);
    if (didClickedOutside) {
      customSelectBtn.classList.remove("isActive");
    }
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function removeSingleChildNode(parent) {
  const child = parent.lastChild;
  parent.removeChild(child);
}

export {
  showDropDown,
  removeAllChildNodes,
  removeSingleChildNode,
  images,
  currentIndex,
  mainDogImageContainer,
  updateCurrentIndex,
  showSliderChanges,
  maincontainer,
  breedImageContainer,
  selectList,
  removeActiveClass,
};
