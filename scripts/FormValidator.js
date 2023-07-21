export class FormValidator {
  constructor(formElement, selectorList ) {
  this._formElement = formElement;
  this._selectorList = selectorList;
  this._inputList = Array.from(formElement.querySelectorAll(this._selectorList.inputSelector));
  this._buttonElement = this._formElement.querySelector(this._selectorList.submitButtonSelector);
  }

  //показать ошибку валидации
_showInputError = (inputElement, validationMessage ) => {
const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
//находим спаны с таким же айди(плюс приписка error) как имя инпута 
inputElement.classList.add(this._selectorList.inputErrorClass);
//добавляем через конфиг класс инпут инвалид
errorElement.textContent = validationMessage;
// показываем ошибку валидации в спане
}

//убрать ошибку валидации
_hideInputError = (inputElement) => {
  const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
  //находим спаны с таким же айди(плюс приписка error) как имя инпута 
  inputElement.classList.remove(this._selectorList.inputErrorClass);
  //убираем класс инпут инвалид
  errorElement.textContent = '';}
//присваем пустую строка спану


//проверяем текст на валидность. если не валидно показываем валидейшн месендж на инпуте
//если валидно убираем
_checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage )}
    else {
      this._hideInputError(inputElement); 
    }
  }

  //проверяем что бы все инпуты были валидны
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid });
  }

  //отключаем кнопку если хотя бы 1 инпут не валиден
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._selectorList.inactiveButtonClass);
//если хотя бы 1 инпут не валиден добавляем кнопке класс button invalid
      this._buttonElement.setAttribute('disabled', true);}
      //отключаем кнопку
    else {
      this._buttonElement.classList.remove(this._selectorList.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');}
      //если все валидно убираем дизейблед и класс
  }

//слышатели событий инпутов и кнопки
  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

//сбрасываем валидацию
  resetValid = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement)  => {
      this._hideInputError(inputElement);
    });
  }

//запуск слушателей событий
  enableValidation = () => {
    this._setEventListeners();
  }
}


//
// function enableValidation(config) {
//   const formList = document.querySelectorAll(config.formSelector);
//   [...formList].forEach(function (formElement) {
//     setEventListener(formElement, config);
//   });
// }

// function chekInputValidity(inputElement, formElement, config) {
//   inputElement.setCustomValidity("");
//   const isInputValid = inputElement.validity.valid;
//   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
//   if (!isInputValid) {
//     showError(inputElement, errorElement, config);
//   } else {
//     hideError(inputElement, errorElement, config);
//   }
// }

// function showError(inputElement, errorElement, config) {
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
// }

// function hideError(inputElement, errorElement, config) {
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
// }

// function disabledButton(buttonElement, config) {
//   buttonElement.disabled = "disabled";
//   buttonElement.classList.add(config.inactiveButtonClass);
// }

// function enabledButton(buttonElement, config) {
//   buttonElement.disabled = false;
//   buttonElement.classList.remove(config.inactiveButtonClass);
// }

// function toggleButtonState(buttonElement, isActive, config) {
//   if (!isActive) {
//     disabledButton(buttonElement, config);
//   } else {
//     enabledButton(buttonElement, config);
//   }
// }

// function setEventListener(formElement, config) {
//   const inputList = formElement.querySelectorAll(config.inputSelector);
//   const submitButtonElement = formElement.querySelector(
//     config.submitButtonSelector
//   );
//   toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
//   [...inputList].forEach(function (inputElement) {
//     inputElement.addEventListener("input", function () {
//       toggleButtonState(
//         submitButtonElement,
//         formElement.checkValidity(),
//         config
//       );
//       chekInputValidity(inputElement, formElement, config);
//     });
//   });

//   formElement.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//     if (!formElement.checkValidity()) return;
//   });
// }

// enableValidation(config);



