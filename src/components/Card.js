export class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._cardTemplate = cardTemplate;
    this._name = data.name;
    this._link = data.link;
    this._showPopup = handleCardClick;
    
  }

  likeCard(){
    this._buttonLike.classList.toggle("element__button-like_active");
  }

  deleteCard(){
    this._cardElement.remove();
    this._cardElement = null;
  }

  createCard() {
    this._cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.element')
      .cloneNode(true);
      this._buttonLike = this._cardElement.querySelector(".element__button-like");
    this._imageOnCard = this._cardElement.querySelector(".element__img");

    this._imageOnCard.src = this._link;
    this._imageOnCard.alt = this._name;
    this._cardElement.querySelector(".element__title").textContent = this._name;

    this._cardElement.querySelector('.element__button-delete').addEventListener('click', () => {
      this.deleteCard();
    });

    this._buttonLike
    .addEventListener('click', () => {
      this.likeCard();
    });
    
    this._imageOnCard
    .addEventListener("click", () => {
      this._showPopup(this._name, this._link);
    });

    return this._cardElement;
  }
}
