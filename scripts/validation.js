const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };
  
  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector);
    submitButton.disabled = true;
    const toggleButtonState = () => {
      const isValid = inputList.every(input => input.validity.valid && input.value.trim() !== "");
      submitButton.disabled = !isValid;
    };
    toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState();
      });
    });
  };
  
  const enableValidation = (settings) => {
    const formList =
      Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
    
    setEventListeners(formElement, settings);
    });

   const overlays = document.querySelectorAll(".popup-overlay");
   overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
    const popup = overlay.closest('.popup');
    if (popup){
     popup.classList.remove('popup__show');
    }
   });
  });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape'){
    const popup = document.querySelector('.popup__show');
    if (popup){
      popup.classList.remove('popup__show')
    }
  }
});

  };

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible"
  });