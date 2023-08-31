import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { UserInfo } from "../components/UserInfo.js";
import { validationClassConfig } from "../utils/constants.js";
import Api from "../components/Api.js";

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
  avatarEditForm,
  popupCardDelete,
  popupAvatarChange,
  buttonOpenPopupAvatarChange,
  configApi,
  profileAvatar,
  buttonSubmitAvatarChange,
} from "../utils/constants.js";

import "../pages/index.css";

const api = new Api(configApi);

//создание валидации для каждой формы
const cardValidation = new FormValidator(cardEditForm, validationClassConfig);
const userValidation = new FormValidator(userEditForm, validationClassConfig);
const avatarValidation = new FormValidator(
  avatarEditForm,
  validationClassConfig
);

//создание и наполнение каркаса карточки
const section = new Section(
  {
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
  userAvatar: profileAvatar,
});

const popupEditUserInformation = new PopupWithForm(popupProfile, (info) =>
  api.editUserInfo(info).then((res) => {
    dataInfo.setUserInfo(res);
  })
);

function changeAvatar(info) {
  api.editAvatar(info).then((res) => {
    dataInfo.setUserAvatar(res);
  });
}

const popupEditAvatar = new PopupWithForm(popupAvatarChange, changeAvatar);

function addNewCard(data) {
  toggleButtonState(true, popupNewCard, "Создать");
  api
    .addCard(data)
    .then((dataFromServer) => {
      const newCard = createCard(dataFromServer);
      section.addItem(newCard, "prepend");
    })
    .catch((err) => console.log(err))
    .finally(() => toggleButtonState(false, popupNewCard, "Создать"));
}

function toggleButtonState(isLoading, popupElement, ButtonText) {
  const popupButton = popupElement.querySelector(
    ".edit-form__button_type_card-create"
  );
  if (isLoading) {
    popupButton.textContent = "Сохранение...";
  } else {
    popupButton.textContent = ButtonText;
  }
}

const popupCard = new PopupWithForm(popupNewCard, addNewCard);

const popupCardDel = new PopupWithConfirm(popupCardDelete);

const popupImage = new PopupWithImage(popupFullImage);

let userId = null;

function createCard(data) {
  const newCard = new Card(
    data,
    userId,
    "#card-template",
    handleCardClick,
    handleCardDelete,
    {
      handleCardLike: (data) => {
        api
          .likeCard(data.getId(), data.isLiked())
          .then((dataCardFromServer) => data.setLikes(dataCardFromServer))
          .catch((err) => console.log(err));
      },
    }
  );
  const cardElement = newCard.generateCard();
  return cardElement;
}

function handleCardClick(alt, src) {
  popupImage.open(alt, src);
}

function handleCardDelete(cardData) {
  popupCardDel.open();
  popupCardDel.cardDelConfirm(() => {
    api
      .deleteCard(cardData.getId())
      .then(() => {
        cardData.deleteCard();
        popupCardDelete.close();
      })
      .catch((err) => console.log(err));
  });
}

cardValidation.enableValidation();
userValidation.enableValidation();
avatarValidation.enableValidation();

//получаем данные с сервера методом геткардс из апи, генерируем их методом рендерим из секшн

api.getUserInfo().then((dataUser) => {
  dataInfo.setUserInfo(dataUser);
  userId = dataUser._id;
});
api.getUserInfo().then(dataUser => dataInfo.setUserAvatar(dataUser));
api.getCards().then((dataCards) => section.renderItems(dataCards));

popupEditUserInformation.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();
popupEditAvatar.setEventListeners();

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

buttonOpenPopupAvatarChange.addEventListener("click", () => {
  popupEditAvatar.open();
  avatarValidation.resetValid();
});
