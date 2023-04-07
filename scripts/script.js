let openPopup = document.querySelector('.profile__button-edit'); // Кнопка открытия редактирования
let popupwindow = document.querySelector('.popup__type-edit');
let closePopup = popupwindow.querySelector('.popup__button-close'); // Кнопка закртытия редактирования
let nameInput = document.querySelector('.profile__info-name');
let jobInput = document.querySelector('.profile__info-job');
let inputName = document.querySelector('.popup__input_form_name');
let inputJob = document.querySelector('.popup__input_form_job');
let formElement = document.querySelector('.popup__form_edit');

let popupCards = document.querySelector('.popup__type-cards'); //Попап с добавлением новой карточки
let buttonPlus = document.querySelector('.profile__button-add'); //Кнопка плюс
let buttonClosePopCards = popupCards.querySelector('.popup__button-close');
let formCards = document.querySelector('.popup__form_cards');
let nameCard = document.querySelector('.popup__input_form_title');
let linkCard = document.querySelector('.popup__input_form_link');

let popupImg = document.querySelector('.popup__type-img');
let popupImgSrc = document.querySelector('.popup__img');
let popupImgText = document.querySelector('.popup__text');
let buttonCloseImg = popupImg.querySelector('.popup__button-close_img');
const userTemplate = document.querySelector('#card').content;
let cards = document.querySelector('.elements');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

for (let i = 0; i < initialCards.length; i++){
  newCardOnline(initialCards[i].link, initialCards[i].name);
} //Отрисовываем 6 карточек из коробки Js

function popupOpen(name){ //Функция открытия попапа с аргументом
  name.classList.add('popup_opened');
  name.classList.remove('animation');
}

function popupClose(name){ //Функция закрытия попапа с аргументом
  name.classList.remove('popup_opened');
  name.classList.add('animation');
}

buttonPlus.addEventListener('click',() => { // Кнопка открытия попапа с добавлением новой карточки
  popupOpen(popupCards);
  linkCard.value='';
  nameCard.value = '';
});

function newCardOnline(lnk, text){
  const userElement = userTemplate.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__img').src = lnk;
  userElement.querySelector('.element__title').textContent = text;
  cards.prepend(userElement);
  //Клонируем заготовку, вставляем нужные данные и добавляем в разметку
  //Ниже вешаем обработчики для кнопок и картинок
  userElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  //Для лайков добавляем или убираем класс, который меняет картинку
  userElement.querySelector('.element__button-delete').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  //Эта кнопка удаляет Родителя
  userElement.querySelector('.element__img').addEventListener('click', function (evt) {
    popupOpen(popupImg);
    popupImgSrc.src = evt.target.src;
    popupImgText.textContent = evt.target.nextSibling.nextSibling.firstElementChild.textContent;
  });
  //Отслеживаем на какую картинку нажали, открываем попап, и собираем данные с карточки где стояла картинка
}

function submitCards (evt) { //функция которая добавляет карточку на страницу с пользовательскими данными
  evt.preventDefault();
  newCardOnline(linkCard.value, nameCard.value);
  popupCloseCards();
}

buttonClosePopCards.addEventListener('click',() => { // Вешаем обработчик на крестик
  popupClose(popupCards);
});


openPopup.addEventListener('click',() => { // Вешаем обработчик на кнопку открытия
  popupOpen(popupwindow);
   inputName.value = nameInput.textContent;
   inputJob.value = jobInput.textContent;
});

closePopup.addEventListener('click',() => { // Вешаем обработчик на крестик
  popupClose(popupwindow);// Убираем активный класс
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameInput.textContent = inputName.value;
  jobInput.textContent = inputJob.value;
  popupClose(popupwindow);
}


buttonCloseImg.addEventListener('click',() => { // Вешаем обработчик на крестик
  popupClose(popupImg);// Убираем активный класс
});

formElement.addEventListener('submit', handleFormSubmit);
formCards.addEventListener('submit', submitCards);
