const popUpProfile = document.querySelector("#popup-profile");
const btnProfile = document.querySelector(".profile__edit-button");
let profileform = document.querySelector("#profile-form");
let nameInput = document.querySelector("#input-name");
let jobInput = document.querySelector("#input-about");
const profileForm = document.querySelector("#profile-form");
let textname = document.querySelector(".profile__name");
let textprofession = document.querySelector(".profile__profession")
//Seleccion los inputs y guardarlos en una variable y dentro de mi funcion handleProfileFormSubmit deberia
//modificar el textContent de el h2 y el p del profile e igualarlos a la propiedad value de la variable input
function handleOpenProfileForm() {
  popUpProfile.classList.add("popup_show");
}

btnProfile.addEventListener("click", handleOpenProfileForm);

document.querySelector(".close-btn").addEventListener("click", function () {
  document.getElementById("popup-profile").classList.remove("popup_show");
});

btnProfile.addEventListener("click", function () {
  document.getElementById("popup-profile").classList.add("popup_show");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
const newName = nameInput.value;
const newJob = jobInput.value;

textname.textContent = newName;
textprofession.textContent = newJob;
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
