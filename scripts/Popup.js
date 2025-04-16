export class Popup {
    constructor (selector){
    this._popupElement = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this)
    this._setEventListeners();    
    }


    open(){
        this._popupElement.classList.add('open');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popupElement.classList.remove('open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event){
        if (event.key === 'Escape'){
            this.close();
        }
    }

    _setEventListeners() {
       const closeButton = this._popupElement.querySelector('.close-button');
       const overlay = this._popupElement.querySelector('.overlay');
       
       closeButton.addEventListener('click', () => this.close());
       overlay.addEventListener('click', () => this.close());
    }

}
