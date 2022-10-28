import { getApiCall } from "./apiHelper";
import {
  showDropDown,
  removeAllChildNodes,
  removeSingleChildNode,
  images,
  showSliderChanges,
  maincontainer,
  breedImageContainer,
  removeActiveClass,
} from "./helper";
import { dogBreedNameUrl, dogBreedImageUrl } from "./constants";
getApiCall(dogBreedNameUrl, displayBreedName);
let previousIndex = 0;

// call API to fetch Select list data
function displayBreedName(data) {
  const breedNameArray = Object.keys(data.message).filter(
    (key) => key.length > 0
  );
  showDropDownData(breedNameArray);
}
// display drop down
showDropDown();
// slider changes
showSliderChanges();
// call API to fetch Image data
function getBreedImageApiData(breedName) {
  getApiCall(
    dogBreedImageUrl.replace(`breed/`, `breed/${breedName}/`),
    displayImageData
  );
}
// display breed name in select option list
function displayImageData(data) {
  const breedImageArray = Object.values(data.message).filter(
    (value) => value.length > 0
  );
  if (!maincontainer.hasChildNodes()) {
    const mainImage = document.createElement("img");
    mainImage.src = breedImageArray[0];
    mainImage.id = "main-dog-image";
    maincontainer.appendChild(mainImage);
  }
  if (!breedImageContainer.hasChildNodes()) {
    const nodes = breedImageArray.map((breedImageList, i) => {
      const dogBreedImageConatiner = document.createElement("div");
      const dogBreedImage = document.createElement("img");
      dogBreedImage.className = "dog-image";
      dogBreedImage.id = "imageId";
      dogBreedImage.onclick = (e) => {
        let imageCurrentIndex = activateImageConatiner(i, e);
        showSliderChanges(imageCurrentIndex);
      };
      dogBreedImageConatiner.className = "image-conatiner slider";
      dogBreedImage.src = breedImageList;
      if (dogBreedImage.src === breedImageArray[0]) {
        dogBreedImage.className = "dog-image active";
      }
      dogBreedImageConatiner.appendChild(dogBreedImage);
      dogImageArray = dogBreedImage;

      return dogBreedImageConatiner;
    });

    breedImageContainer.append(...nodes);
  }
}
// Add active class for the Clicked image
function activateImageConatiner(imageCurrentIndex, e) {
  if (imageCurrentIndex !== previousIndex) {
    removeActiveClass(images);
    images[previousIndex].classList.remove("active");
    previousIndex = imageCurrentIndex;
    e.target.classList.add("active");
    let mainConatinerImage = maincontainer.firstChild;
    mainConatinerImage.src = images[previousIndex].src;
    return previousIndex;
  } else {
    removeActiveClass(images);
    return previousIndex;
  }
}
// display dropdown select list
function showDropDownData(dogBreedNameList) {
  const nodes = dogBreedNameList.map((dogBreedNameList) => {
    const option = document.createElement("option");
    option.className = "selectCustom-option";
    option.textContent = dogBreedNameList;
    option.addEventListener("click", () => {
      if (
        maincontainer.hasChildNodes() ||
        breedImageContainer.hasChildNodes()
      ) {
        removeSingleChildNode(maincontainer);
        removeAllChildNodes(breedImageContainer);
      }
      getBreedImageApiData(option.value);
    });
    return option;
  });

  selectList.append(...nodes);
}
export { breedImageArray };
