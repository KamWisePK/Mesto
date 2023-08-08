import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import { validationClassConfig } from "../utils/constants.js";

import {
  popupProfile,
  inputEditFormUserName,
  inputEditFormUserJob,
  headerProfileUserName,
  textProfileUserJob,
  buttonEditProfile,
  buttonCreateCard,
  sectionElements,
  popupNewCard,
  popupFullImage,
  userEditForm,
  cardEditForm,
} from "../utils/constants.js";

import "../pages/index.css";

//создание валидации для каждой формы
const cardValidation = new FormValidator(cardEditForm, validationClassConfig);
const userValidation = new FormValidator(userEditForm, validationClassConfig);

const section = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      const cardItem = createCard(item);
      section.addItem(cardItem);
    },
  },
  sectionElements
);

const dataInfo = new UserInfo({
  userName: headerProfileUserName,
  userJob: textProfileUserJob,
});

const popupEditUserInformation = new PopupWithForm(popupProfile, (info) =>
  dataInfo.setUserInfo(info)
);

const popupCard = new PopupWithForm(popupNewCard, (info) => {
  section.addItem(createCard(info));
  });

const popupImage = new PopupWithImage(popupFullImage);

function createCard(data) {
  const newCard = new Card(data, "#card-template", handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

function handleCardClick(alt, src) {
  popupImage.open(alt, src);
}

cardValidation.enableValidation();
userValidation.enableValidation();
section.renderItems();
popupEditUserInformation.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  popupEditUserInformation.open();
  const { userName, userJob } = dataInfo.getUserInfo();
  inputEditFormUserName.value = userName;
  inputEditFormUserJob.value = userJob;
  userValidation.resetValid();
});

buttonCreateCard.addEventListener("click", () => {
  popupCard.open();
  cardValidation.resetValid();
});
