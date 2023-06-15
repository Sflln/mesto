export class Card {
  constructor(
    data,
    cardTemplate,
    handleCardClick,
    proofDeliteCard,
    id,
    likeCards
  ) {
    this._cardTemplate = cardTemplate;
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes;
    this._showPopup = handleCardClick;
    this._userId = id;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._proofDeliteCard = proofDeliteCard;
    this._likeCards = likeCards;
  }

  _isLike() {
    return this._like.some((item) => item._id === this._userId);
  }

  likeCard(likes) {
    this._cardElement.querySelector(".element__likes").textContent =
      likes.length;
    this._like = likes;
    if (this._isLike()) {
      this._buttonLike.classList.add("element__button-like_active");
    } else {
      this._buttonLike.classList.remove("element__button-like_active");
    }
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  createCard() {
    this._cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".element")
      .cloneNode(true);

    this._buttonLike = this._cardElement.querySelector(".element__button-like");
    this._buttonDelite = this._cardElement.querySelector(
      ".element__button-delete"
    );
    this._imageOnCard = this._cardElement.querySelector(".element__img");

    this._imageOnCard.src = this._link;
    this._imageOnCard.alt = this._name;
    this._cardElement.querySelector(".element__title").textContent = this._name;

    if (this._userId !== this._ownerId) {
      this._buttonDelite.remove();
    }

    this.likeCard(this._like);

    this._buttonDelite.addEventListener("click", () => {
      this._proofDeliteCard(this._cardId, this);
    });

    this._buttonLike.addEventListener("click", () => {
      this._likeCards(this._cardId, this._isLike(), this);
    });

    this._imageOnCard.addEventListener("click", () => {
      this._showPopup(this._name, this._link);
    });

    return this._cardElement;
  }
}
