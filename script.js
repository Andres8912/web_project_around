const popUpProfile = document.querySelector("#popup-profile");
const btnProfile = document.querySelector(".profile__edit-button");
let profileform = document.querySelector("#profile-form");
let nameform = document.querySelector("#edit-name");
let jobform = document.querySelector("#edit-about");

function handleOpenProfileForm () {
  popUpProfile.classList.add("popup_show")
}

btnProfile.addEventListener("click" , handleOpenProfileForm) 

document.querySelector('.close-btn').addEventListener('click', function() {
  document.getElementById('popup-profile').classList.remove('popup_show');
});

btnProfile.addEventListener('click', function() {
  document.getElementById('popup-profile').classList.add('popup_show');
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
}