import { Card } from "../Components/Card.js";
import { FormValidator } from "../Components/FormValidator.js";
import { setOverlayAndEscapeClose } from "../Components/Utils.js";
import { Section } from "../Components/Section.js";
import { Popup } from "../Components/Popup.js";
import { PopupWithForm } from "../Components/PopupWithForm.js"; 
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { UserInfo } from "../Components/UserInfo.js";

const popUpProfile = document.querySelector("#popup-profile");
const btnProfile = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector("#form__name");
const jobInput = document.querySelector("#form__about");
const profileForm = document.querySelector("#profile-form");
const textName = document.querySelector(".profile__name");
const textProfession = document.querySelector(".profile__profession");
const btnPhoto = document.querySelector(".profile__addbutton");
const popUpPhoto = document.querySelector("#popup-addphoto");
const btnclosePhoto = document.querySelector("#close-photo-form");
const templateCard = document.querySelector('.template-card');
const cardArea = document.querySelector(".elements");
const inputCardTitle = document.querySelector("#form__title");
const inputCardLink = document.querySelector("#form__url");
const formCard = document.querySelector("#photo-form");
const popUpNewPic = document.querySelector("#popup__pic");
const closeImage = document.querySelector("#popup__pic-close");
const popUpInfo = document.querySelector(".popup__info");
const popUpImage = document.querySelector(".popup__image");




const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];



function handleOpenProfileForm() {
  popUpProfile.classList.add("popup__show");
}

function handleOpenPhotoForm (){
  popUpPhoto.classList.add("popup__show");
  
}


// Renderiza las tarjetas iniciales
initialCards.forEach((item) => {
  const card = new Card(item, ".template-card");
  document.querySelector(".elements").append(card.generateCard());
});

// Validación de formularios
const formValidatorProfile = new FormValidator({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
}, document.querySelector("#profile-form"));

formValidatorProfile.enableValidation();

const formValidatorPhoto = new FormValidator({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
}, document.querySelector("#photo-form"));

formValidatorPhoto.enableValidation();

setOverlayAndEscapeClose();

btnPhoto.addEventListener("click", handleOpenPhotoForm)
btnProfile.addEventListener("click", handleOpenProfileForm)

function handlePhotoFormSubmit(evt) {
  evt.preventDefault();

  const item = {
    name: inputCardTitle.value,
    link: inputCardLink.value
  }

  const newPhoto = new Card(item, ".template-card");
  cardArea.prepend(newPhoto.generateCard());

  document.getElementById("popup-addphoto").classList.remove("popup__show");
}


profileForm.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handlePhotoFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
const newName = nameInput.value;
const newJob = jobInput.value;

textName.textContent = newName;
textProfession.textContent = newJob;

popUpProfile.classList.remove("popup__show");
}

