import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitCardDel) {
    super(popupSelector);
    this._form = this._popup.querySelector(".edit-form");
    this._submitCardDel = submitCardDel;
  }

cardDelConfirm(confirm){
    this.__submitCardDel = confirm;
}

setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) =>{
        evt.preventDefault();
        this.__submitCardDel();
    })
}

}
