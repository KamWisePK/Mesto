export const initialCards = [
  {
    name: "Какое-",
    link: "https://bipbap.ru/wp-content/uploads/2021/06/Aosp8.jpg",
  },
  {
    name: "нибудь",
    link: "https://lifeo.ru/wp-content/uploads/gifki-kosmos-6.gif",
  },
  {
    name: "название",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "для",
    link: "https://usagif.com/wp-content/uploads/gif/outerspace-39.gif.webp",
  },
  {
    name: "каждой",
    link: "https://bestanimations.com/media/galaxy/1593105101hand-holding-galaxy-gif.gif",
  },
  {
    name: "гифки",
    link: "https://usagif.com/wp-content/uploads/gif/outerspace-26.gif.webp",
  },
];

export const validationClassConfig = {
  formSelector: ".edit-form",
  inputSelector: ".edit-form__input",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_type_invalid",
  inputErrorClass: "edit-form__input_type_invalid",
};

//поп - ап редактирования профиля
export const popupProfile = document.querySelector(".popup_type_profile"); //
export const inputEditFormUserName = document.querySelector(
  ".edit-form__input_type_name"
);
export const inputEditFormUserJob = document.querySelector(
  ".edit-form__input_type_job"
);

//блок профиля(поля отображения имени и профессии, кнопка редактирвоания профиля, кнопка добавления карточки)
export const headerProfileUserName = document.querySelector(
  ".profile__info-name"
);
export const textProfileUserJob = document.querySelector(".profile__info-job");
export const buttonEditProfile = document.querySelector(".profile__edit-btn");
export const buttonCreateCard = document.querySelector(".profile__add-btn");

//секция для вставки карточек
export const sectionElements = document.querySelector(".elements");

// поп- ап добавления карточки
export const popupNewCard = document.querySelector(".popup_type_new-card");

//поп - ап открытой карточки
export const popupFullImage = document.querySelector(".popup_type_img");

//выбор форм по айди
export const userEditForm = popupProfile.querySelector("#userEditForm");
export const cardEditForm = popupNewCard.querySelector("#cardEditForm");
