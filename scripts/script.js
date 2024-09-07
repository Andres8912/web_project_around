const popUpProfile = document.querySelector("#popup-profile");
const btnProfile = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector("#input-name");
const jobInput = document.querySelector("#input-about");
const profileForm = document.querySelector("#profile-form");
const textName = document.querySelector(".profile__name");
const textProfession = document.querySelector(".profile__profession");
const btnPhoto = document.querySelector(".profile__addbutton");
const popUpPhoto = document.querySelector("#popup-addphoto");
const btnclosePhoto = document.querySelector("#close-photo-form");
const templateCard = document.querySelector('.template-card');
const cardArea = document.querySelector(".elements");
const inputCardTitle = document.querySelector("#input-title");
const inputCardLink = document.querySelector("#input-url");
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

function PhotoCreator(title, link){
  const photo = templateCard.cloneNode(true).content.querySelector('.element');
  const imageClone = photo.querySelector(".element__image");
  const titleClone = photo.querySelector(".element__text");
  const likePhoto = photo.querySelector(".element__group");
  const deletePhoto = photo.querySelector(".element__trash");
  imageClone.src = link;
  titleClone.textContent = title;
  deletePhoto.addEventListener("click", function(){
  photo.remove();
  })
  likePhoto.addEventListener("click", function(){
    likePhoto.classList.toggle("element__group-like");
  })
  imageClone.addEventListener("click", function(){
    handleOpenImage(title, link);
  })
  return photo;
}

initialCards.forEach(function(element){
const newPhoto = PhotoCreator(element.name, element.link);
cardArea.append(newPhoto);
})


PhotoCreator();

document.querySelector("#profile-close-button").addEventListener("click", function () {
  document.getElementById("popup-profile").classList.remove("popup__show");
});

btnProfile.addEventListener("click", function () {
  document.getElementById("popup-profile").classList.add("popup__show");
});

document.querySelector("#photo-close-button").addEventListener("click",function(){
  document.getElementById("popup-addphoto").classList.remove("popup__show");
});

btnPhoto.addEventListener("click",function(){
  document.getElementById("popup-addphoto").classList.add("popup__show");
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
const newName = nameInput.value;
const newJob = jobInput.value;

textName.textContent = newName;
textProfession.textContent = newJob;
}

function handlePhotoFormSubmit(evt){
  evt.preventDefault();
  const newPhoto = PhotoCreator(inputCardTitle.value, inputCardLink.value);
  cardArea.prepend(newPhoto)
  document.getElementById("popup-addphoto").classList.remove("popup__show");
}


function handleOpenImage(title, link){
popUpImage.src = link
popUpInfo.textContent = title
popUpNewPic.classList.add("popup__show")
}

function handleCloseImage(){
popUpNewPic.classList.remove("popup__show")
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handlePhotoFormSubmit);

profileForm.addEventListener('submit', function(event) {
  event.preventDefault();
  popUpProfile.classList.remove('popup__show');
});


btnPhoto.addEventListener("click", handleOpenPhotoForm)
btnProfile.addEventListener("click", handleOpenProfileForm)
closeImage.addEventListener("click", handleCloseImage)