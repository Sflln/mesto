import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const buttonOpenEditProfile = document.querySelector(".profile__button-edit"); // Кнопка открытия редактирования профиля
const popupEditProfile = document.querySelector(".popup_type-edit");
const buttonClosePopupEdit = popupEditProfile.querySelector(".popup__button-close");
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
const buttonSaveProfile = popupEditProfile.querySelector(".popup__button-save");
const buttonSaveCard = popupCards.querySelector(".popup__button-save");

const classListForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//Функция открытия попапа с аргументом
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

//Функция закрытия попапа с аргументом
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

//Функция закрытия попапа с по кнопке esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

//Функция закрытия попапа с по нажатию на оверлей
popupElements.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popupElement);
    }
  });
});

// функция которая вносит изменение в профиль
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

// функция которая открывает попап с картинкой и ее названием
function showPopupImage(name, link) {
  openPopup(popupWithImage);
  popupImgText.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
}

// функция которая добавляет карточку в контейнер
function renderCard(card){
  document.querySelector(".elements").prepend(card);
}

function handleCardFormSubmit(evt) {
  //функция которая добавляет карточку на страницу с пользовательскими данными
  evt.preventDefault();
  const cardValue = {
    name: nameCard.value,
    link: linkCard.value,
  };
  renderCard(new Card(cardValue, '#card', showPopupImage).createCard());
  closePopup(popupCards);
}

buttonOpenEditProfile.addEventListener("click", () => {
  // Вешаем обработчик на кнопку открытия
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  new FormValidator(classListForm, popupEditProfile)._hideInputError(popupEditProfile, inputName);
  new FormValidator(classListForm, popupEditProfile)._hideInputError(popupEditProfile, inputJob);
  new FormValidator(classListForm, popupEditProfile).toggleButtonState();
});

buttonClosePopupEdit.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  closePopup(popupEditProfile); // Убираем активный класс
});

buttonAddCardPopup.addEventListener("click", () => {
  // Кнопка открытия попапа с добавлением новой карточки
  openPopup(popupCards);
  linkCard.value = "";
  nameCard.value = "";
  new FormValidator(classListForm, popupCards)._hideInputError(popupCards, linkCard);
  new FormValidator(classListForm, popupCards)._hideInputError(popupCards, nameCard);
  new FormValidator(classListForm, popupCards).toggleButtonState();
});

buttonClosePopupCards.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  closePopup(popupCards);
});

buttonCloseImg.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  closePopup(popupWithImage); // Убираем активный класс
});

//Отрисовываем 6 карточек из коробки Js
for (let i = 0; i < initialCards.length; i++) {
  renderCard(new Card(initialCards[i], '#card', showPopupImage).createCard());
}

const validFormPopupEditProfile = new FormValidator(
  classListForm,
  popupEditProfile
);
validFormPopupEditProfile.enableValidation();

const validFormPopupCards = new FormValidator(classListForm, popupCards);
validFormPopupCards.enableValidation();

formProfile.addEventListener("submit", handleProfileSubmit);
formCard.addEventListener("submit", handleCardFormSubmit);
