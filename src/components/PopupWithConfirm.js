import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".edit-form");
  }

cardDelConfirm(confirm){
    this._submitCardDel = confirm;
}

setEventListeners() {
   super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitCardDel();
        this.close();
    })
   
   // this._form.addEventListener("submit", (evt) =>{
    //     evt.preventDefault();
    //     this.__submitCardDel();
    // });
}

}
