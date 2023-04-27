const classListForm = {
  // Выбираем форму, инпуты и кнопку сабмита
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  // Классы для скрытия кнопки, оформления текста ошибкок и скрытия ошибок (через visibility)
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, parametrs) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(parametrs.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(parametrs.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const showInputError = (formElement, inputElement, errorMessage, parametrs) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parametrs.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.title = errorMessage;
  errorElement.classList.add(parametrs.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, parametrs) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parametrs.inputErrorClass);
  errorElement.classList.remove(parametrs.errorClass);
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, parametrs) => {
  if (!inputElement.validity.valid) {
    console.log(inputElement.value);
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      parametrs
    );
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, parametrs);
    console.log(inputElement.value);
  }
};

const setEventListeners = (formElement, parametrs) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(parametrs.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    parametrs.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, parametrs);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      console.log(inputElement.value);
      isValid(formElement, inputElement, parametrs);
      toggleButtonState(inputList, buttonElement, parametrs);
    });
  });
};

const enableValidation = (parametrs) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(
    document.querySelectorAll(parametrs.formSelector)
  );
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, parametrs);
  });
};

// Вызовем функцию
enableValidation(classListForm);