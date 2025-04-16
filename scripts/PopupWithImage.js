import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (selector){
        super(selector);
        this._imageElement = this._popupElement.querySelector('.popup__image');
        this.captionElement = this._popupElement.querySelector('.popup-caption');
    }

    open(imageSrc, caption){
        this._imageElement.src = imageSrc;
        this._captionElement.textContent = caption;
        super.open();
    }
}