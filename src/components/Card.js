import { handleOpenImage } from "./Utils.js";

export class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteCard) {
      this._data = data;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteCard = handleDeleteCard;
      this._likeButton = null;
      this._isLiked = data.isLiked || false;
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
        .addEventListener("click", () => this._handleDeleteClick());
  
      this._likeButton = this._element.querySelector(".element__group");
      this._likeButton.addEventListener("click", () => this._handleLikeIcon());
  
      this._element
        .querySelector(".element__image")
        .addEventListener("click", () => this._handleImageClick());
    }
  
    // Método privado para manejar el evento de eliminar tarjeta
    _handleDeleteClick() {
      console.log(this._data._id, "handleDeleteClick");
      if (this._handleDeleteCard) {
        this._handleDeleteCard(this._data._id, this._element);
      } 
    }
  
    // Método privado para manejar el evento de like 
    _handleLikeIcon() {
      const method = this._isLiked ? "DELETE" : "PUT";
      
      fetch(`https://around-api.es.tripleten-services.com/v1/cards/${this._data._id}/likes`, {
        method: method,
        headers: {
          authorization: "fe2e148d-43d2-4d41-bc66-c98a4df3ae46"
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Error en la respuesta del servidor");
        })
        .then((updatedCard) => {
          console.log("Like actualizado:", updatedCard);
          // Actualizar el estado del like basado en la respuesta del servidor
          this._isLiked = updatedCard.isLiked;
          this._updateLikeVisual();
        })
        .catch((err) => {
          console.log("Error al actualizar el like:", err);
        });
    }
  
    // Método privado para actualizar la apariencia visual del like
    _updateLikeVisual() {
      if (this._isLiked) {
        this._likeButton.classList.add("element__group-like");
      } else {
        this._likeButton.classList.remove("element__group-like");
      }
    }
  
    // Método público que crea la tarjeta
    generateCard() { 
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.element__text').textContent = this._data.name;
      this._element.querySelector('.element__image').src = this._data.link;
      
      // Establecer el estado inicial del like
      this._updateLikeVisual();
      
      return this._element;
    }

  }