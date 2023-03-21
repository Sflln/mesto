let openPopup = document.querySelector('.profile__button-edit');// Кнопка открытия редактирования
let popupwindow = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__button-close');// Кнопка закртытия редактирования
let nameInput = document.querySelector('.profile__info-name');
let jobInput = document.querySelector('.profile__info-job');
let inputName = document.querySelector('.popup__input_form_name');
let inputJob = document.querySelector('.popup__input_form_job');
let formElement = document.querySelector('.popup__form');

openPopup.addEventListener('click',() => { // Вешаем обработчик на кнопку открытия
  popupwindow.classList.add('popup_opened'); // Добавляем класс к попапу
   inputName.value = nameInput.textContent;
   inputJob.value = jobInput.textContent;

});
function popupCloseFunction (){
  popupwindow.classList.remove('popup_opened');
}
closePopup.addEventListener('click',() => { // Вешаем обработчик на крестик
  popupCloseFunction ();// Убираем активный класс
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameInput.textContent = inputName.value;
  jobInput.textContent = inputJob.value;
  popupCloseFunction ();
}

formElement.addEventListener('submit', handleFormSubmit);



