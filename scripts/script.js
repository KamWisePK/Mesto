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

function toggleClass(event) {
  event.target.classList.toggle("element__like-button_active");
}

function createElement(cardData) {
  const elementItem = templateElement.cloneNode(true);
  const titleElement = elementItem.querySelector(".element__title");
  const imgElement = elementItem.querySelector(".element__image");
  const buttonDelElement = elementItem.querySelector(".element__del");
  const buttonLikeElement = elementItem.querySelector(".element__like-button");
  buttonLikeElement.addEventListener("click", toggleClass);
  imgElement.alt = cardData.name;
  imgElement.src = cardData.link;
  titleElement.textContent = cardData.name;
  buttonDelElement.addEventListener("click", function () {
    elementItem.remove();
  });
  imgElement.addEventListener("click", function () {
    openPopup(popupFullImage);
    photoPopupFullImage.src = imgElement.src;
    photoPopupFullImage.alt = imgElement.alt;
    figCaptionPopupFullImage.textContent = titleElement.textContent;
  });
  return elementItem;
}

function renderCard(data, container, position = "append") {
  switch (position) {
    case "append":
      container.append(createElement(data));
      break;
    case "prepend":
      container.prepend(createElement(data));
      break;
    default:
      break;
  }
}
// Не понял как по вашему совету можно запустить в index.js функцию сброса формы написанную в validation.js.
// или она должна запускаться в validation.js?
function resetFormNewCard() {
  formAddNewCard.reset();
  spanFormAddNewCardList.forEach(function (span) {
    span.textContent = "";
  });
  inputFormAddNewCardList.forEach(function (input) {
    input.classList.remove("edit-form__input_type_invalid");
  });
  const buttonFormAddNewCard = document.querySelector(
    ".edit-form__button_type_card-create"
  );
  buttonFormAddNewCard.setAttribute("disabled", "");
}

function openPopupNewCard() {
  resetFormNewCard();
  openPopup(popupNewCard);
}

function handleSubmitAdd(e) {
  e.preventDefault();
  const cardName = inputEditFormCardName.value;
  const cardUrl = inputEditFormCardUrl.value;
  const newCard = {
    name: cardName,
    link: cardUrl,
  };
  renderCard(newCard, sectionElements, "prepend");
  formAddNewCard.reset();

  closePopup(popupNewCard);
}

initialCards.forEach(function (item) {
  renderCard(item, sectionElements, "append");
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
