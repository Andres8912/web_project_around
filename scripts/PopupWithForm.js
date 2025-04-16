import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, submitCallback){
        super(selector);
        this._submitCallback = submitCallback;
        this._formElement = this._popupElement.querySelector('form');
        this.inputElements = this._formElement.querySelectorAll('input');
    }

    _getInputValues(){
        const values = {};
        this._inputElements.forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }

    _setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            const inputValues = this._getInputValues();
            this._submitCallback(inputValues);
            this.close();
        });
    }

    close(){
        super.close();
        this._formElement.reset();
    }
}