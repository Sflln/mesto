const buttonOpenEditProfile = document.querySelector(".profile__button-edit"); // Кнопка открытия редактирования профиля
const popupEditProfile = document.querySelector(".popup_type-edit");
const buttonClosePopupEdit = popupEditProfile.querySelector(".popup__button-close"); // Кнопка закртытия редактирования
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
const popupElements = document.querySelectorAll('.popup');

function openPopup(popup) {
  //Функция открытия попапа с аргументом
  // popup.classList.remove("animation");
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  //Функция закрытия попапа с аргументом
  // popup.classList.add("animation");
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc);
  
}

function closePopupEsc(evt){
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

popupElements.forEach( popupElement => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup__container")) {
      closePopup(popupElement);
    }
  });
});

buttonOpenEditProfile.addEventListener("click", () => {
  // Вешаем обработчик на кнопку открытия
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  hideInputError(popupEditProfile, inputName, classListForm);
  hideInputError(popupEditProfile, inputJob, classListForm);
  const buttonSaveCard = popupEditProfile.querySelector(".popup__button-save");
  toggleButtonState(popupEditProfile, buttonSaveCard, parametrs);
});

buttonClosePopupEdit.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  closePopup(popupEditProfile); // Убираем активный класс
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].link, initialCards[i].name);
} //Отрисовываем 6 карточек из коробки Js

buttonAddCardPopup.addEventListener("click", () => {
  // Кнопка открытия попапа с добавлением новой карточки
  openPopup(popupCards);
  linkCard.value = "";
  nameCard.value = "";
  hideInputError(popupCards, linkCard, classListForm);
  hideInputError(popupCards, nameCard, classListForm);
  const buttonSaveCard = popupCards.querySelector(".popup__button-save");
  toggleButtonState(popupCards, buttonSaveCard, parametrs);
});

function renderCard(link, text){
  cardsContainer.prepend(createCard(link, text));
}

function createCard(link, text) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const imageOnCard = cardElement.querySelector(".element__img");
  imageOnCard.src = link;
  cardElement.querySelector(".element__title").textContent = text;
  imageOnCard.alt = text;
  //Клонируем заготовку, вставляем нужные данные и добавляем в разметку
  //Ниже вешаем обработчики для кнопок и картинок
  cardElement
    .querySelector(".element__button-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__button-like_active");
    }); //Для лайков добавляем или убираем класс, который меняет картинку
    cardElement
    .querySelector(".element__button-delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    }); //Эта кнопка удаляет Родителя
  imageOnCard.addEventListener("click", function (evt) {
    openPopup(popupWithImage);
    popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.src;
    popupImgText.textContent = evt.target.alt;
  });

  return cardElement;
  //Отслеживаем на какую картинку нажали, открываем попап, и собираем данные с карточки где стояла картинка
}

function handleCardFormSubmit(evt) {
  //функция которая добавляет карточку на страницу с пользовательскими данными
  evt.preventDefault();
  renderCard(linkCard.value, nameCard.value);
  closePopup(popupCards); //ЧТО ТО СДЕЛАЛА
}

buttonClosePopupCards.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  closePopup(popupCards);
});

buttonCloseImg.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  closePopup(popupWithImage); // Убираем активный класс
});

formProfile.addEventListener("submit", handleProfileSubmit);
formCard.addEventListener("submit", handleCardFormSubmit);
