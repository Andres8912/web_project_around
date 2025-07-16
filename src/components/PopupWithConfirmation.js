export class PopupWithConfirmation {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    
    this._handleEscClose = this._handleEscClose.bind(this);
    this._setEventListeners();
    this._setConfirmListener();    
  }

  _setEventListeners() {
    const closeButton = this._popupElement.querySelector('.close-btn');
    const overlay = this._popupElement.querySelector('.popup-overlay');
    
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }
    
    if (overlay) {
      overlay.addEventListener('click', () => this.close());
    }
  }

  _setConfirmListener() {
    const confirmButton = this._popupElement.querySelector('.popup__confirm-button');
    const cancelButton = this._popupElement.querySelector('.popup__cancel-button');
    
    if (confirmButton) {
      confirmButton.addEventListener('click', () => {
        this._handleConfirm();
        this.close();
      });
    }
    
    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        this.close();
      });
    }
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open(handleConfirm) {
    this._popupElement.classList.add('popup__show');    
    this._handleConfirm = handleConfirm;
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup__show');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}