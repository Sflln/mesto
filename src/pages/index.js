import "./index.css";
import { initialCards } from "../utils/cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import ProofPopup from "../components/ProofPopup.js";
import Api from "../components/Api.js";

const buttonOpenEditProfile = document.querySelector(".profile__button-edit"); // Кнопка открытия редактирования профиля
const formProfile = document.querySelector(".popup__form_edit");

const popupCards = document.querySelector(".popup_type-cards"); //Попап с добавлением новой карточки
const buttonAddCardPopup = document.querySelector(".profile__button-add"); //Кнопка плюс
const buttonChangeAvatar = document.querySelector(".profile__button-avatar");
const popupProfileInputs = formProfile.querySelectorAll(".popup__input");

const classListForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function handleAvatarSubmit(inputValues) {
  popupAvatar.renderSaving(true);
  apiUser
    .changedAvatar(inputValues)
    .then((res) => {
      profileInformation.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderSaving(false);
    });
}

buttonChangeAvatar.addEventListener("click", () => {
  popupAvatar.open();
  validFormPopupAvatar.resetInputErrors();
  validFormPopupAvatar.toggleButtonState();
});

function makeCard(dataCard, id) {
  const card = new Card(
    dataCard,
    "#card",
    handleCardClick,
    proofDeliteCard,
    id,
    likeCards
  );
  const newCard = card.createCard();
  return newCard;
}

function proofDeliteCard(id, card) {
  popupDeliteCard.open();
  popupDeliteCard.callBack(() => deliteCardCallBack(id, card));
}

function deliteCardCallBack(id, card) {
  apiUser
    .deleteCard(id)
    .then(() => {
      popupDeliteCard.close();
      card.deleteCard();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleCardClick(name, link) {
  popupWithPhoto.open(name, link);
}

buttonAddCardPopup.addEventListener("click", () => {
  // Кнопка открытия попапа с добавлением новой карточки
  popupAddCard.open();
  validFormPopupCards.resetInputErrors();
  validFormPopupCards.toggleButtonState();
});

function handleCardFormSubmits(inputValues) {
  popupAddCard.renderSaving(true);
  apiUser
    .postNewCard(inputValues)
    .then((data) => {
      cards.addItem(makeCard(data, data.owner._id));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderSaving(false);
    });
}

function likeCards(id, isLike, card) {
  if (isLike) {
    apiUser
      .dislikedCard(id)
      .then((data) => {
        card.likeCard(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    apiUser
      .likedCard(id)
      .then((data) => {
        card.likeCard(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleProfileSubmit(inputValues) {
  popupEditProfile.renderSaving(true);
  apiUser
    .saveUserChanges(inputValues)
    .then((inputValues) => {
      profileInformation.setUserInfo(inputValues);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderSaving(false);
    });
}

buttonOpenEditProfile.addEventListener("click", () => {
  popupEditProfile.open();
  const userData = profileInformation.getUserInfo();
  popupProfileInputs.forEach((input) => {
    input.value = userData[input.name];
  });
  validFormPopupEditProfile.resetInputErrors();
  validFormPopupEditProfile.toggleButtonState();
});

const validFormPopupEditProfile = new FormValidator(
  classListForm,
  document.querySelector(".popup_type-edit")
);
validFormPopupEditProfile.enableValidation();

const validFormPopupCards = new FormValidator(classListForm, popupCards);
validFormPopupCards.enableValidation();

const validFormPopupAvatar = new FormValidator(
  classListForm,
  document.querySelector(".popup_type-avatar")
);
validFormPopupAvatar.enableValidation();

const popupEditProfile = new PopupWithForm(
  ".popup_type-edit",
  handleProfileSubmit
);
popupEditProfile.setEventListeners();

const popupWithPhoto = new PopupWithImage(".popup_type-img");
popupWithPhoto.setEventListeners();

const popupAvatar = new PopupWithForm(".popup_type-avatar", handleAvatarSubmit);
popupAvatar.setEventListeners();

const cards = new Section(
  {
    renderer: (cardItem, id) => {
      cards.addItem(makeCard(cardItem, id));
    },
  },
  ".elements"
);

const profileInformation = new UserInfo(
  ".profile__info-name",
  ".profile__info-job",
  ".profile__avatar"
);

const popupDeliteCard = new ProofPopup(".popup_type-delite");
popupDeliteCard.setEventListeners();

const popupAddCard = new PopupWithForm(
  ".popup_type-cards",
  handleCardFormSubmits
);
popupAddCard.setEventListeners();

const apiUser = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: "6d6f7c25-ff0c-4cc3-89b7-0784d16e6e95",
});

Promise.all([apiUser.getUserData(), apiUser.getInitialCards()])
  .then((values) => {
    profileInformation.setUserInfo(values[0]);
    cards.renderItems(values[1], values[0]._id);
  })
  .catch((err) => {
    console.log(err);
  });
