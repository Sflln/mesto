const buttonOpenEditProfile = document.querySelector(".profile__button-edit"); // Кнопка открытия редактирования профиля
const popupEditProfile = document.querySelector(".popup_type-edit");
const buttonclosePopupEdit = popupEditProfile.querySelector(
  ".popup__button-close"
); // Кнопка закртытия редактирования
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

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].link, initialCards[i].name);
} //Отрисовываем 6 карточек из коробки Js

function openPopup(popup) {
  //Функция открытия попапа с аргументом
  popup.classList.add("popup_opened");
  popup.classList.remove("animation");
}

function closePopup(popup) {
  //Функция закрытия попапа с аргументом
  popup.classList.remove("popup_opened");
  popup.classList.add("animation");
}

buttonAddCardPopup.addEventListener("click", () => {
  // Кнопка открытия попапа с добавлением новой карточки
  openPopup(popupCards);
  linkCard.value = "";
  nameCard.value = "";
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

function submitCards(evt) {
  //функция которая добавляет карточку на страницу с пользовательскими данными
  evt.preventDefault();
  renderCard(linkCard.value, nameCard.value);
  closePopup(popupCards); //ЧТО ТО СДЕЛАЛА
}

buttonClosePopupCards.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  closePopup(popupCards);
});

buttonOpenEditProfile.addEventListener("click", () => {
  // Вешаем обработчик на кнопку открытия
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

buttonclosePopupEdit.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  closePopup(popupEditProfile); // Убираем активный класс
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

buttonCloseImg.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  closePopup(popupWithImage); // Убираем активный класс
});

formProfile.addEventListener("submit", handleProfileSubmit);
formCard.addEventListener("submit", submitCards);
