import { handleOpenImage } from "./Utils.js";



export class Card {
    constructor(data, templateSelector, handleCardClick) {
      this._data = data;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }
  
    // Método privado para obtener la plantilla
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content.querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
    }
  
    // Método privado para manejar el evento de click en la imagen
    _handleImageClick() {
      // Lógica para abrir la imagen en el popup
    handleOpenImage(this._data.name, this._data.link);
        
    }
  
    // Método privado para agregar los listeners
    _setEventListeners() {
      this._element
        .querySelector(".element__trash")
        .addEventListener("click", () => this._handleDeleteCard());
  
      this._element
        .querySelector(".element__group")
        .addEventListener("click", () => this._handleLikeIcon());
  
      this._element
        .querySelector(".element__image")
        .addEventListener("click", () => this._handleImageClick());
    }
  
    // Método privado para manejar el evento de eliminar tarjeta
    _handleDeleteCard() {
      this._element.remove();
      this._element = null;
    }
  
    // Método privado para manejar el evento de like 
    _handleLikeIcon() {
      this._element
        .querySelector(".element__group")
        .classList.toggle("element__group-like");
    }
  
    // Método público que crea la tarjeta
    generateCard() { 
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.element__text').textContent = this._data.name;
      this._element.querySelector('.element__image').src = this._data.link;
      return this._element;
    }

  }