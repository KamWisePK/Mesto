import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._photoPopupFullImage = this._popup.querySelector(".popup__img");
        this._figCaptionPopupFullImage = this._popup.querySelector(".popup__figcaption");
    }

    open(alt, src) {
        this._photoPopupFullImage.src = src;
        this._photoPopupFullImage.alt = alt;
        this._figCaptionPopupFullImage.textContent = alt;
        super.open();
    }

}

