import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { setOverlayAndEscapeClose } from "../components/Utils.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js"; 
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

// Declaraciones de elementos del DOM
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
const popUpConfirm = document.querySelector("#popup-confirm");

// Nuevos elementos para el avatar
const popUpAvatar = document.querySelector("#popup-avatar");
const btnAvatar = document.querySelector(".profile__picture-edit-button");
const avatarForm = document.querySelector("#avatar-form");
const avatarInput = document.querySelector("#form__avatar");
const profilePicture = document.querySelector(".profile__picture");

// Instancia de la API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "fe2e148d-43d2-4d41-bc66-c98a4df3ae46",
    "Content-Type": "application/json"
  }
});

// Función utilitaria para manejar el estado de carga de los botones
function setButtonLoadingState(button, isLoading, loadingText = "Guardando...", originalText = "Guardar") {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
    button.classList.add('form__submit_loading');
  } else {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove('form__submit_loading');
  }
}

// Función para manejar la eliminación de tarjetas
function handleDeleteCard(cardId, cardElement) {
  api.deleteCard(cardId)
    .then(() => {
      // Eliminar la tarjeta del DOM
      cardElement.remove();
    })
    .catch((err) => {
      // mostrar un mensaje de error al usuario
    });
}

// Crear instancia del popup de confirmación
const popupConfirm = new PopupWithConfirmation("#popup-confirm");

// Función para abrir el popup de confirmación


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
  // cubrir los campos del formulario con los datos actuales
  nameInput.value = textName.textContent;
  jobInput.value = textProfession.textContent;
  popUpProfile.classList.add("popup__show");
}

function handleOpenPhotoForm (){
  // Limpiar el formulario antes de abrir
  formCard.reset();
  popUpPhoto.classList.add("popup__show");
}

function handleOpenAvatarForm() {
  // Limpiar el formulario antes de abrir
  avatarForm.reset();
  popUpAvatar.classList.add("popup__show");
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newAvatarUrl = avatarInput.value;
  const submitButton = avatarForm.querySelector('.form__submit');

  // Activar estado de carga
  setButtonLoadingState(submitButton, true, "Guardando...", "Guardar");

  // Enviar nueva foto de perfil al servidor con PATCH
  api.updateUserAvatar(newAvatarUrl)
    .then((userData) => {
      profilePicture.src = userData.avatar;
      // Cerrar el popup
      popUpAvatar.classList.remove("popup__show");
      // Limpiar el formulario
      avatarForm.reset();
    })
    .catch((err) => {
      // mostrar un mensaje de error al usuario 
    })
    .finally(() => {
      // Restaurar estado normal del botón
      setButtonLoadingState(submitButton, false, "Guardando...", "Guardar");
    });
}

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

const formValidatorAvatar = new FormValidator({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
}, document.querySelector("#avatar-form"));

formValidatorAvatar.enableValidation();

setOverlayAndEscapeClose();

btnPhoto.addEventListener("click", handleOpenPhotoForm)
btnProfile.addEventListener("click", handleOpenProfileForm)
btnAvatar.addEventListener("click", handleOpenAvatarForm)

function handlePhotoFormSubmit(evt) {
  evt.preventDefault();

  const item = {
    name: inputCardTitle.value,
    link: inputCardLink.value
  }

  const submitButton = formCard.querySelector('.form__submit');

  // Activar estado de carga
  setButtonLoadingState(submitButton, true, "Creando...", "Crear");

  // Enviar nueva tarjeta al servidor con POST
  api.createCard(item)
    .then((cardData) => {
      // Crear y mostrar la nueva tarjeta con los datos del servidor
      const newPhoto = new Card(cardData, ".template-card", null, openDeleteConfirmPopup);
      cardArea.prepend(newPhoto.generateCard());
      // Cerrar el popup
      document.getElementById("popup-addphoto").classList.remove("popup__show");
      // Limpiar el formulario
      formCard.reset();
    })
    .catch((err) => {
      //  mostrar un mensaje de error al usuario 
    })
    .finally(() => {
      // Restaurar estado normal del botón
      setButtonLoadingState(submitButton, false, "Creando...", "Crear");
    });
}
function openDeleteConfirmPopup(cardId, cardElement) {
  popupConfirm.open(() => {
    handleDeleteCard(cardId, cardElement)
  });
}


profileForm.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handlePhotoFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  const submitButton = profileForm.querySelector('.form__submit');

  // Activar estado de carga
  setButtonLoadingState(submitButton, true, "Guardando...", "Guardar");

  // Enviar datos al servidor con PATCH
  api.updateUserInfo({
    name: newName,
    about: newJob
  })
    .then((userData) => {
      // Actualizar la información del perfil en la página
      textName.textContent = userData.name;
      textProfession.textContent = userData.about;
      // Cerrar el popup
      popUpProfile.classList.remove("popup__show");
    })
    .catch((err) => {
      // mostrar un mensaje de error al usuario 
    })
    .finally(() => {
      // Restaurar estado normal del botón
      setButtonLoadingState(submitButton, false, "Guardando...", "Guardar");
    });
}

// Renderiza las tarjetas iniciales
/*initialCards.forEach((item) => {
  //const card = new Card(item, ".template-card");
  const card = new Card(item, ".template-card", null, openDeleteConfirmPopup);
  document.querySelector(".elements").append(card.generateCard());
})*/

// Solicitud para obtener información del usuario
api.getUserInfo()
  .then((userData) => {
    // Actualizar la información del perfil en la página
    textName.textContent = userData.name;
    textProfession.textContent = userData.about;
    // Actualizar la foto de perfil si existe
    if (userData.avatar) {
      profilePicture.src = userData.avatar;
    }
  })
  .catch((err) => {
    // mostrar un mensaje de error al usuario 
  });

// Solicitud para obtener las tarjetas
api.getInitialCards()
  .then((cardsData) => {
    // Renderizar las tarjetas desde el servidor
    cardsData.forEach((item) => {
      const card = new Card(item, ".template-card", null, openDeleteConfirmPopup);
      document.querySelector(".elements").append(card.generateCard());
    });
  })
  .catch((err) => {
    //  mostrar un mensaje de error al usuario 
  });

