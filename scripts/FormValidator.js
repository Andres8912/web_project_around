// FormValidator.js
export class FormValidator {
    constructor(settings, formElement) {
      this._settings = settings;
      this._formElement = formElement;
      this.formSelector = settings.formSelector;
      this.inputSelector = settings.inputSelector;
      this.submitButtonSelector = settings.submitButtonSelector;
      this.inactiveButtonClass = settings.inactiveButtonClass;
      this.inputErrorClass = settings.inputErrorClass;
      this.errorClass = settings.errorClass;
      this._submitButton = this._formElement.querySelector(settings.submitButtonSelector);
      this._inputList = Array.from(
        this._formElement.querySelectorAll(this._settings.inputSelector)
      );
      this._submitButton = this._formElement.querySelector(
        this._settings.submitButtonSelector
      );
    }
  
    // Método privado para mostrar errores
    _showInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  
    // Método privado para ocultar errores
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.classList.remove(this._settings.errorClass);
      errorElement.textContent = "";
    }
  
    // Método privado para comprobar la validez de los inputs
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    // Método privado para manejar el estado del botón submit
    _toggleButtonState() {
      const isValid = this._inputList.every(
        (inputElement) => inputElement.validity.valid
      );
      this._submitButton.disabled = !isValid;
    }
  
    // Método privado para agregar listeners
    _setEventListeners() {
      this._toggleButtonState();
  
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }
  
    // Método público que habilita la validación
    enableValidation() {
      this._setEventListeners();
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
    }
  }
