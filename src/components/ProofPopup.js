import { Popup } from "./Popup.js";

export default class ProofPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonProof = document.querySelector(".popup__button-save_delite");
  }

  callBack(action) {
    this._callBack = action;
  }


  setEventListeners() {
    super.setEventListeners();
    this._buttonProof.addEventListener("click", (evt) => {
      evt.preventDefault();
      console.log("меня нажали");
      this._callBack();
    });
  }
}
