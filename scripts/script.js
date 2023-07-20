import {Card} from './cards.js';
import {Validation} from './validation.js';
const initialCards = [
  {
    name: 'Какое-',
    link: 'https://bipbap.ru/wp-content/uploads/2021/06/Aosp8.jpg'
  },
  {
    name: 'нибудь',
    link: 'https://lifeo.ru/wp-content/uploads/gifki-kosmos-6.gif'
  },
  {
    name: 'название',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'для',
    link: 'https://usagif.com/wp-content/uploads/gif/outerspace-39.gif.webp'
  },
  {
    name: 'каждой',
    link: 'https://bestanimations.com/media/galaxy/1593105101hand-holding-galaxy-gif.gif'
  },
  {
    name: 'гифки',
    link: 'https://usagif.com/wp-content/uploads/gif/outerspace-26.gif.webp'
  }
]; 

const config = {
  formSelector: ".edit-form",
  inputSelector: ".edit-form__input",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_type_invalid",
  inputErrorClass: "edit-form__input_type_invalid",
};



const popupProfile = document.querySelector(".popup_type_profile");
const formEditUserInformation = popupProfile.querySelector(".edit-form");
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonClosePopupList = document.querySelectorAll(".popup__close-btn");
const inputEditFormUserName = document.querySelector(
  ".edit-form__input_type_name"
);
const inputEditFormUserJob = document.querySelector(
  ".edit-form__input_type_job"
);
const headerProfileUserName = document.querySelector(".profile__info-name");
const textProfileUserJob = document.querySelector(".profile__info-job");
const sectionElements = document.querySelector(".elements");
const templateElement = document
  .querySelector("#card-template")
  .content.querySelector(".element");
const buttonCreateCard = document.querySelector(".profile__add-btn");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formAddNewCard = popupNewCard.querySelector(".edit-form");
const inputEditFormCardName = document.querySelector(
  ".edit-form__input_type_card-name"
);
const inputEditFormCardUrl = document.querySelector(
  ".edit-form__input_type_card-url"
);
const inputFormAddNewCardList =
  formAddNewCard.querySelectorAll(".edit-form__input");
const spanFormAddNewCardList =
  formAddNewCard.querySelectorAll(".edit-form__error");
const spanFormEditUserInformation =
  formEditUserInformation.querySelectorAll(".edit-form__error");
const popupFullImage = document.querySelector(".popup_type_img");
const photoPopupFullImage = document.querySelector(".popup__img");
const figCaptionPopupFullImage = document.querySelector(".popup__figcaption");
const userEditForm = popupProfile.querySelector("#userEditForm");
const cardEditForm = popupNewCard.querySelector("#cardEditForm");
const cardValidation = new Validation(cardEditForm,config);
const userValidation = new Validation(userEditForm,config);

cardValidation.enableValidation();
userValidation.enableValidation();

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

function closePopupOverlay(evt) {
  const popupIsOpen = document.querySelector(".popup_opened");
  if (evt.target === popupIsOpen) {
    closePopup(popupIsOpen);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("mousedown", closePopupOverlay);
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("mousedown", closePopupOverlay);
  document.removeEventListener("keydown", closePopupEsc);
}

function editUserInformation() {
  spanFormEditUserInformation.forEach(function (text) {
    text.textContent = "";
  });
  inputEditFormUserName.value = headerProfileUserName.textContent;
  inputEditFormUserJob.value = textProfileUserJob.textContent;
  let event = new Event("input");
  inputEditFormUserName.dispatchEvent(event);
  inputEditFormUserJob.dispatchEvent(event);
  openPopup(popupProfile);
}

function saveUserInformation(evt) {
  evt.preventDefault();
  headerProfileUserName.textContent = inputEditFormUserName.value;
  textProfileUserJob.textContent = inputEditFormUserJob.value;
  closePopup(popupProfile);
}

function handleCardClick(alt, src) {
  openPopup(popupFullImage);
  photoPopupFullImage.src = src;
  photoPopupFullImage.alt = alt;
  figCaptionPopupFullImage.textContent = alt;
}

// Не понял как по вашему совету можно запустить в index.js функцию сброса формы написанную в validation.js.
// или она должна запускаться в validation.js?
// function resetFormNewCard() {
//   formAddNewCard.reset();
//   spanFormAddNewCardList.forEach(function (span) {
//     span.textContent = "";
//   });
//   inputFormAddNewCardList.forEach(function (input) {
//     input.classList.remove("edit-form__input_type_invalid");
//   });
//   const buttonFormAddNewCard = document.querySelector(
//     ".edit-form__button_type_card-create"
//   );
//   buttonFormAddNewCard.classList.add("edit-form__button_type_invalid");
//   buttonFormAddNewCard.setAttribute("disabled", "");
// }

function openPopupNewCard() {
  cardEditForm.reset();
  cardValidation.resetValid();
  openPopup(popupNewCard);
}

function createCard(data) {
  const newCard = new Card(data, '#card-template', handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
  }

function handleSubmitAdd(e) {
  e.preventDefault();
  const cardElement = createCard({name: inputEditFormCardName.value, link: inputEditFormCardUrl.value});
  sectionElements.prepend(cardElement);
  formAddNewCard.reset();
  closePopup(popupNewCard);
}

initialCards.forEach(function (item) {
const cardElement = createCard(item);
sectionElements.append(cardElement);
});

buttonClosePopupList.forEach((item) => {
  item.addEventListener("click", function () {
    closePopup(item.closest(".popup"));
  });
});




formEditUserInformation.addEventListener("submit", saveUserInformation);
buttonEditProfile.addEventListener("click", editUserInformation);
buttonCreateCard.addEventListener("click", openPopupNewCard);
formAddNewCard.addEventListener("submit", handleSubmitAdd);
