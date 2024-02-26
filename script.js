document.addEventListener('DOMContentLoaded', function() {
    
const editButton = document.querySelector('#edit-button');
const popup = document.querySelector('#edit-popup');
const closeButton = popup.querySelector('.close-btn');
const profileForm = document.querySelector('#profile-form');
const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#about');
  
editButton.addEventListener('click', function() {
popup.style.display = 'block';
nameInput.value = ''; // Aquí puedes asignar el valor actual del nombre
aboutInput.value = ''; // Aquí puedes asignar el valor actual del "Acerca de mí"
});
  
closeButton.addEventListener('click', function() {
popup.style.display = 'none';
});
  
profileForm.addEventListener('submit', function(event) {
event.preventDefault();
const newName = nameInput.value;
const newAbout = aboutInput.value;
      // Aquí puedes actualizar los datos en la página//
        popup.style.display = 'none';
    });
  });