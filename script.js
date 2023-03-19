let openPopup = document.querySelector('.profile__button-edit');// Кнопка открытия редактирования
let popupwindow = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__button-close');// Кнопка закртытия редактирования
let nameInput = document.querySelector('.profile__info-name');
let jobInput = document.querySelector('.profile__info-job');
let inputName = document.querySelector('.popup__form-name');
let inputJob = document.querySelector('.popup__form-job');
let buttonSubmit = document.querySelector('.popup__button-save');
let formElement = document.querySelector('.popup__form');

openPopup.addEventListener('click',() => { // Вешаем обработчик на кнопку открытия
  popupwindow.classList.add('popup_opened'); // Добавляем класс к попапу
   inputName.value = nameInput.textContent;
   inputJob.value = jobInput.textContent;

});

closePopup.addEventListener('click',() => { // Вешаем обработчик на крестик
  popupwindow.classList.remove('popup_opened'); // Убираем активный класс
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameInput.textContent = inputName.value;
  jobInput.textContent = inputJob.value;
  popupwindow.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);



