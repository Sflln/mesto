import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    this._button = this._popupForm.querySelector('.popup__button-save');
    this._textButton = this._button.textContent;
  }

  renderSaving(status){
    if(status){
      this._button.textContent = `Cохранение...`;
    } else {
      this._button.textContent = this._textButton;
    }
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    this._formData = {};

    this._inputList.forEach((input) => {
      this._formData[input.name] = input.value;
      
    });
    return this._formData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm (this._getInputValues());
      this.close();
    });
  }
}
