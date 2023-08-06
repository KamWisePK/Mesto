import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import {Section} from "./section.js";
import {PopupWithForm } from './PopupWithForm.js';
import {PopupWithImage } from './PopupWithImage.js';
import {UserInfo } from './UserInfo.js';
import {initialCards } from "./constants.js" ;
import {validationClassConfig } from "./constants.js" ;




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
const cardValidation = new FormValidator(cardEditForm, validationClassConfig);
const userValidation = new FormValidator(userEditForm, validationClassConfig);

//вызов валидации форм


const section = new Section(
  {item: initialCards,renderer: (item) => {
      const cardItem = createCard(item);
      section.addItem(cardItem);},},
  sectionElements
);



const dataInfo = new UserInfo(
  {
    userName: headerProfileUserName,
    userJob: textProfileUserJob
  }
);

const popupEditUserInformation = new PopupWithForm(popupProfile, (info) => dataInfo.setUserInfo(info));

const popupCard = new PopupWithForm(popupNewCard, (info) => {
  section.addItem(createCard(info));
});

const popupImage = new PopupWithImage(popupFullImage);

function createCard(data) {
  const newCard = new Card(data, "#card-template", handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

function handleCardClick(evt) {
  popupImage.open(evt.target);
}

cardValidation.enableValidation();
userValidation.enableValidation();
section.renderItems();
popupEditUserInformation.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  popupEditUserInformation.open();
  const { userName, userJob } = dataInfo.getUserInfo();
  inputEditFormUserName.value = userName;
  inputEditFormUserJob.value = userJob;
  userValidation.resetValid();
});

buttonCreateCard.addEventListener('click', () => {
  popupCard.open();
  cardValidation.resetValid();
});

// //Открытие поп-апа редактирования профиля
// function editUserInformation() {
//   userValidation.resetValid();
//   inputEditFormUserName.value = headerProfileUserName.textContent;
//   inputEditFormUserJob.value = textProfileUserJob.textContent;
//   openPopup(popupProfile);
// }

// //Сохранения информации в профиле
// function saveUserInformation(evt) {
//   evt.preventDefault();
//   headerProfileUserName.textContent = inputEditFormUserName.value;
//   textProfileUserJob.textContent = inputEditFormUserJob.value;
//   closePopup(popupProfile);
// }

// //Открытие поп-апа добавления карточки
// function openPopupNewCard() {
//   cardEditForm.reset();
//   cardValidation.resetValid();
//   openPopup(popupNewCard);
// }

// //Создание новой карточки


// //Вставка новой карточки
// function handleSubmitAdd(e) {
//   e.preventDefault();
//   const cardElement = createCard({
//     name: inputEditFormCardName.value,
//     link: inputEditFormCardUrl.value,
//   });
//   sectionElements.prepend(cardElement);
//   formAddNewCard.reset();
//   closePopup(popupNewCard);
// }



// //Добавляем слушатели событий
// formEditUserInformation.addEventListener("submit", saveUserInformation);
// buttonEditProfile.addEventListener("click", editUserInformation);
// buttonCreateCard.addEventListener("click", openPopupNewCard);
// formAddNewCard.addEventListener("submit", handleSubmitAdd);
