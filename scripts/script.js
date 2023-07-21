import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import {initialCards } from "./constants.js" 

const config = {
  formSelector: ".edit-form",
  inputSelector: ".edit-form__input",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_type_invalid",
  inputErrorClass: "edit-form__input_type_invalid",
};

//поп - ап редактирования профиля
const popupProfile = document.querySelector(".popup_type_profile");//
const formEditUserInformation = popupProfile.querySelector(".edit-form");//
const inputEditFormUserName = document.querySelector(".edit-form__input_type_name");
const inputEditFormUserJob = document.querySelector(".edit-form__input_type_job");

//блок профиля(поля отображения имени и профессии, кнопка редактирвоания профиля, кнопка добавления карточки)
const headerProfileUserName = document.querySelector(".profile__info-name");
const textProfileUserJob = document.querySelector(".profile__info-job");
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonCreateCard = document.querySelector(".profile__add-btn");

//секция для вставки карточек
const sectionElements = document.querySelector(".elements");

// поп- ап добавления карточки
const popupNewCard = document.querySelector(".popup_type_new-card");
const formAddNewCard = popupNewCard.querySelector(".edit-form");
const inputEditFormCardName = document.querySelector(".edit-form__input_type_card-name");
const inputEditFormCardUrl = document.querySelector(".edit-form__input_type_card-url");

//поп - ап открытой карточки
const popupFullImage = document.querySelector(".popup_type_img");
const photoPopupFullImage = document.querySelector(".popup__img");
const figCaptionPopupFullImage = document.querySelector(".popup__figcaption");

//выбор форм по айди
const userEditForm = popupProfile.querySelector("#userEditForm");
const cardEditForm = popupNewCard.querySelector("#cardEditForm");

//создание валидации для каждой формы
const cardValidation = new FormValidator(cardEditForm, config);
const userValidation = new FormValidator(userEditForm, config);

//вызов валидации форм
cardValidation.enableValidation();
userValidation.enableValidation();

//Закрытие поп-апа по нажатию клавиши Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

// Закрытие поп-апа по клику на оверлей или кнопке закрытия
const popups = document.querySelectorAll('.popup'); //Ищем все попапы
popups.forEach((popup) => {
popup.addEventListener('mousedown', (evt) => {
//Благодаря всплытию при клике на крестик мы поймаем событие на элементе попапа.
//Проверяем что кликнули на оверлей или на крестик.
if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')){
//В currentTarget у нас всегда будет элемент на котором мы поймали событие, т.е. попап.
closePopup(popup);
}
});
}); 


//Открытие поп - апа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

//Закрытие поп - апа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

//Открытие поп-апа редактирования профиля
function editUserInformation() {
  userValidation.resetValid();
  inputEditFormUserName.value = headerProfileUserName.textContent;
  inputEditFormUserJob.value = textProfileUserJob.textContent;
  openPopup(popupProfile);
}

//Сохранения информации в профиле
function saveUserInformation(evt) {
  evt.preventDefault();
  headerProfileUserName.textContent = inputEditFormUserName.value;
  textProfileUserJob.textContent = inputEditFormUserJob.value;
  closePopup(popupProfile);
}

//Открытие поп-апа карточки(открытие картинки)
function handleCardClick(alt, src) {
  photoPopupFullImage.src = src;
  photoPopupFullImage.alt = alt;
  figCaptionPopupFullImage.textContent = alt;
  openPopup(popupFullImage);
}

//Открытие поп-апа добавления карточки
function openPopupNewCard() {
  cardEditForm.reset();
  cardValidation.resetValid();
  openPopup(popupNewCard);
}

//Создание новой карточки
function createCard(data) {
  const newCard = new Card(data, "#card-template", handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

//Вставка новой карточки
function handleSubmitAdd(e) {
  e.preventDefault();
  const cardElement = createCard({
    name: inputEditFormCardName.value,
    link: inputEditFormCardUrl.value,
  });
  sectionElements.prepend(cardElement);
  formAddNewCard.reset();
  closePopup(popupNewCard);
}

//Создание стартовых карточек из массива
initialCards.forEach(function (item) {
  const cardElement = createCard(item);
  sectionElements.append(cardElement);
});

//Добавляем слушатели событий
formEditUserInformation.addEventListener("submit", saveUserInformation);
buttonEditProfile.addEventListener("click", editUserInformation);
buttonCreateCard.addEventListener("click", openPopupNewCard);
formAddNewCard.addEventListener("submit", handleSubmitAdd);
