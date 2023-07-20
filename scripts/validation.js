export class Validation {
  constructor(formElement, selectorList ) {
  this._formElement = formElement;
  this._selectorList = selectorList;
  this._inputList = Array.from(formElement.querySelectorAll(this._selectorList.inputSelector));
  this._buttonElement = this._formElement.querySelector(this._selectorList.submitButtonSelector);
  }
_showInputError = (inputElement, validationMessage ) => {
const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
inputElement.classList.add(this._selectorList.inputErrorClass);
errorElement.textContent = validationMessage;
}

_hideInputError = (inputElement) => {
  const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(this._selectorList.inputErrorClass);
  errorElement.textContent = '';
  }

_chekInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage )}
    else {
      this._hideInputError(inputElement); 
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._selectorList.inactiveButtonClass);

      this._buttonElement.setAttribute('disabled', true);}
    else {
      this._buttonElement.classList.remove(this._selectorList.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');}
  }

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._chekInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  resetValid = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement)  => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  }
}

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



