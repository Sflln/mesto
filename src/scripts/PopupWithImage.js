import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popupElement.querySelector('.popup__text');
    this._link = this._popupElement.querySelector('.popup__img');
  }

  open(title, link) {
    super.open();
    this._name.textContent = title;
    this._link.src = link;
    this._link.alt = title;
  }
}