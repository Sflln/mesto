import './index.css';
import { initialCards } from "../utils/cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonOpenEditProfile = document.querySelector(".profile__button-edit"); // Кнопка открытия редактирования профиля
const popupElementProfile = document.querySelector(".popup_type-edit");
const inputName = document.querySelector(".popup__input_form_name");
const inputJob = document.querySelector(".popup__input_form_job");
const formProfile = document.querySelector(".popup__form_edit");

const popupCards = document.querySelector(".popup_type-cards"); //Попап с добавлением новой карточки
const buttonAddCardPopup = document.querySelector(".profile__button-add"); //Кнопка плюс
const nameCard = document.querySelector(".popup__input_form_title");
const linkCard = document.querySelector(".popup__input_form_link");

const popupProfileInputs = formProfile.querySelectorAll(".popup__input");

const classListForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function handleCardClick(name, link) {
  popupWithPhoto.open(name, link);
}

function makeCard(dataCard) {
  const card = new Card(dataCard, "#card", handleCardClick );
  const newCard = card.createCard();

  return newCard;
}

// функция которая вносит изменение в профиль
function handleProfileSubmit(inputValues) {
  profileInformation.setUserInfo(inputValues);
}

buttonOpenEditProfile.addEventListener("click", () => {
  popupEditProfile.open();
  const userData = profileInformation.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });
  validFormPopupEditProfile.resetInputErrors();
  validFormPopupEditProfile.toggleButtonState();
});

buttonAddCardPopup.addEventListener("click", () => {
  // Кнопка открытия попапа с добавлением новой карточки
  popupAddCard.open();
  validFormPopupCards.resetInputErrors();
  validFormPopupCards.toggleButtonState();
});

function handleCardFormSubmits(inputValues) {
  cards.addItem(makeCard(inputValues));
}

const validFormPopupEditProfile = new FormValidator(
  classListForm,
  document.querySelector(".popup_type-edit"));
validFormPopupEditProfile.enableValidation();

const validFormPopupCards = new FormValidator(classListForm, popupCards);
validFormPopupCards.enableValidation();

const popupEditProfile = new PopupWithForm(".popup_type-edit", handleProfileSubmit);
popupEditProfile.setEventListeners();

const popupWithPhoto = new PopupWithImage(".popup_type-img");
popupWithPhoto.setEventListeners();

const cards = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      cards.addItem(makeCard(cardItem) );
    },
  },
  ".elements"
);
cards.renderItems();

const profileInformation = new UserInfo(".profile__info-name",".profile__info-job" );

const popupAddCard = new PopupWithForm(".popup_type-cards", handleCardFormSubmits);
popupAddCard.setEventListeners();