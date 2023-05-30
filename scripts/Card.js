export class Card {
  constructor(data, cardSelector, showFunction) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._showPopup = showFunction;
  }

  _createCard() {
    this._cardElement = this._cardSelector
      .querySelector(".element")
      .cloneNode(true);

    const imageOnCard = this._cardElement.querySelector(".element__img");
    imageOnCard.src = this._link;
    imageOnCard.alt = this._name;
    this._cardElement.querySelector(".element__title").textContent = this._name;

    this._cardElement
      .querySelector(".element__button-like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__button-like_active");
      });

    this._cardElement
      .querySelector(".element__button-delete")
      .addEventListener("click", function (evt) {
        evt.target.closest(".element").remove();
      });

    this._cardElement
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._showPopup(this._name, this._link);
      });

    return this._cardElement;
  }

  renderCard() {
    document.querySelector(".elements").prepend(this._createCard());
  }
}
