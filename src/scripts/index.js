import '../pages/index.css';
import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js"

const buttonOpenEditProfile = document.querySelector(".profile__button-edit"); // Кнопка открытия редактирования профиля
const popupElementProfile = document.querySelector(".popup_type-edit");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-job");
const inputName = document.querySelector(".popup__input_form_name");
const inputJob = document.querySelector(".popup__input_form_job");
const formProfile = document.querySelector(".popup__form_edit");

const popupCards = document.querySelector(".popup_type-cards"); //Попап с добавлением новой карточки
const buttonAddCardPopup = document.querySelector(".profile__button-add"); //Кнопка плюс
const buttonClosePopupCards = popupCards.querySelector(".popup__button-close");
const formCard = document.querySelector(".popup__form_cards");
const nameCard = document.querySelector(".popup__input_form_title");
const linkCard = document.querySelector(".popup__input_form_link");

const popupWithImage = document.querySelector(".popup_type-img");
const popupImage = document.querySelector(".popup__img");
const popupImgText = document.querySelector(".popup__text");
const buttonCloseImg = popupWithImage.querySelector(".popup__button-close_img");
const cardTemplate = document.querySelector("#card").content;
const cardsContainer = document.querySelector(".elements");
const popupElements = document.querySelectorAll(".popup");
const buttonSaveCard = popupCards.querySelector(".popup__button-save");
const popupProfileInputs = formProfile.querySelectorAll(".popup__input");

const classListForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function handleCardClick(title, link) {
  popupWithPhoto.open(title, link);
}

function renderCard(dataCard) {
  const card = new Card(dataCard, "#card", handleCardClick );
  const newCard = card.createCard();

  return newCard;
}

// функция которая вносит изменение в профиль
function handleProfileSubmit() {
  profileInformation.setUserInfo(inputName.value, inputJob.value);
  popupEditProfile.close();
}

buttonOpenEditProfile.addEventListener("click", () => {
  popupEditProfile.open();
  const userData = profileInformation.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });
  validFormPopupEditProfile.hideInputError(popupElementProfile, inputName);
  validFormPopupEditProfile.hideInputError(popupElementProfile, inputJob);
  validFormPopupEditProfile.toggleButtonState();
});

buttonAddCardPopup.addEventListener("click", () => {
  // Кнопка открытия попапа с добавлением новой карточки
  popupAddCard.open();
  validFormPopupCards.hideInputError(popupCards, linkCard);
  validFormPopupCards.hideInputError(popupCards, nameCard);
  validFormPopupCards.toggleButtonState();
});

function handleCardFormSubmits() {
  //функция которая добавляет карточку на страницу с пользовательскими данными
  const cardValue = {
    name: nameCard.value,
    link: linkCard.value,
  };
  cards.addItem(renderCard(cardValue));
  popupAddCard.close();
  
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
      cards.addItem(renderCard(cardItem) );
    },
  },
  ".elements"
);
cards.renderItems();

const profileInformation = new UserInfo(".profile__info-name",".profile__info-job" );

const popupAddCard = new PopupWithForm(".popup_type-cards", handleCardFormSubmits);
popupAddCard.setEventListeners();