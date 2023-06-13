import { Popup } from "./Popup.js";


export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  // метод, который собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  // дополнительно добавляем обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
  }
}