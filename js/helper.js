import { findElementByClassName, querySlecetor } from "./constants";

const previousButtons = findElementByClassName("prev");
const nextButtons = findElementByClassName("next");
const images = findElementByClassName("dog-image");
const maincontainer = querySlecetor("#main-image");
const breedImageContainer = querySlecetor("#image-conatiner");
const selectList = querySlecetor("#selectList");

function moveSlides(nextImage) {
  console.log("nextSlide", nextImage);
  images[nextImage].classList.add("active");
  let mainConatinerImage = maincontainer.firstChild;
  mainConatinerImage.src = images[nextImage].src;
}
function showSliderChanges(updateCurrentIndex = 0) {
  console.log("previous value", updateCurrentIndex);
  let currentIndex = updateCurrentIndex;

  for (let prevBtn of previousButtons) {
    prevBtn.addEventListener("click", function onClick() {
      for (let image of images) {
        image.classList.remove("active");
      }
      let slideCount = images.length - 1;
      console.log("prev currentindexx", currentIndex);
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
  for (let nextBtn of nextButtons) {
    nextBtn.addEventListener("click", function onClick() {
      for (let image of images) {
        image.classList.remove("active");
      }
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
};
