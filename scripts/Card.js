export class Card {
    constructor(data, templateSelector) {
      this._title = data.name;
      this._imageLink = data.link;
      this._templateSelector = templateSelector;
    }
  
    // Método privado para obtener la plantilla
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content.querySelector(".element")
        .cloneNode(true);
  
      return cardElement;
    }
  
    // Método privado para manejar el evento de click en la imagen
    _handleImageClick() {
      // Lógica para abrir la imagen en el popup
      this.handleOpenImage(this._title, this._imageLink);
    }

    handleOpenImage() {
        
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
  
    // Método privado para manejar el evento de "like" en la tarjeta
    _handleLikeIcon() {
      this._element
        .querySelector(".element__group")
        .classList.toggle("element__group-like");
    }
  
    // Método público que crea la tarjeta
    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector(".element__image").src = this._imageLink;
      this._element.querySelector(".element__text").textContent = this._title;
      this._setEventListeners();
  
      return this._element;
    }
  }