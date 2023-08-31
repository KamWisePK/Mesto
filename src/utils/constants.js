export const validationClassConfig = {
  formSelector: ".edit-form",
  inputSelector: ".edit-form__input",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_type_invalid",
  inputErrorClass: "edit-form__input_type_invalid",
};

export const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-73/",
  headers: {
    authorization: "9d53ee09-a4cc-4b6a-9f72-a12f979618e1",
    "Content-Type": "application/json",
  },
};

//поп - ап редактирования профиля
export const popupProfile = document.querySelector(".popup_type_profile"); //
export const inputEditFormUserName = document.querySelector(".edit-form__input_type_name");
export const inputEditFormUserJob = document.querySelector(".edit-form__input_type_job");
export const profileAvatar = document.querySelector(".profile__avatar");

//блок профиля(поля отображения имени и профессии, кнопка редактирвоания профиля, кнопка добавления карточки, кнопка редактирования аватара)
export const headerProfileUserName = document.querySelector(".profile__info-name");
export const textProfileUserJob = document.querySelector(".profile__info-job");
export const buttonEditProfile = document.querySelector(".profile__edit-btn");
export const buttonCreateCard = document.querySelector(".profile__add-btn");
export const buttonOpenPopupAvatarChange = document.querySelector(".profile__avatar-btn");

//секция для вставки карточек
export const sectionElements = document.querySelector(".elements");

// поп- ап добавления карточки
export const popupNewCard = document.querySelector(".popup_type_new-card");

//поп - ап открытой карточки
export const popupFullImage = document.querySelector(".popup_type_img");

//поп-ап смены аватара
export const popupAvatarChange = document.querySelector(".popup_type_avatar-change");
export const buttonSubmitAvatarChange = popupAvatarChange.querySelector(
  ".edit-form__button_type_avatar-update"
);

//поп-ап подтверждения удаления карточки
export const popupCardDelete = document.querySelector(".popup_type_delete-card");

//выбор форм по айди
export const userEditForm = popupProfile.querySelector("#userEditForm");
export const cardEditForm = popupNewCard.querySelector("#cardEditForm");
export const avatarEditForm = popupAvatarChange.querySelector("#avatarEditForm");
