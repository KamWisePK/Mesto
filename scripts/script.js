const popupProfile = document.querySelector(".popup_type_profile");
const formEditUserInformation = popupProfile.querySelector('.edit-form');
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonClosePopupList = document.querySelectorAll(".popup__close-btn");
const inputEditFormUserName = document.querySelector(".edit-form__input_type_name");
const inputEditFormUserJob = document.querySelector(".edit-form__input_type_job");
const headerProfileUserName = document.querySelector(".profile__info-name");
const textProfileUserJob = document.querySelector(".profile__info-job");
const sectionElements = document.querySelector('.elements');
const templateElement = document.querySelector("#card-template").content.querySelector('.element');
const buttonCreateCard = document.querySelector(".profile__add-btn");
const popupNewCard = document.querySelector('.popup_type_new-card');
const formAddNewCard = popupNewCard.querySelector('.edit-form');
const inputEditFormCardName = document.querySelector('.edit-form__input_type_card-name');
const inputEditFormCardUrl = document.querySelector('.edit-form__input_type_card-url');
const popupFullImage = document.querySelector('.popup_type_img'); 
const photoPopupFullImage = document.querySelector('.popup__img');
const figCaptionPopupFullImage = document.querySelector('.popup__figcaption');

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function clearFormInput(name) {
  name.value ='';
  }

function editUserInformation() {
  inputEditFormUserName.value = headerProfileUserName.textContent;
  inputEditFormUserJob.value = textProfileUserJob.textContent; 
  openPopup(popupProfile);
}

function saveUserInformation(evt) {
  evt.preventDefault();
  headerProfileUserName.textContent = inputEditFormUserName.value;
  textProfileUserJob.textContent = inputEditFormUserJob.value;
  closePopup(popupProfile);
}

function toggleClass(event) {
  event.target.classList.toggle('element__like-button_active')};

function createElement(cardData) {
  const elementItem = templateElement.cloneNode(true);
  const titleElement = elementItem.querySelector('.element__title');
  const imgElement = elementItem.querySelector('.element__image');
  const buttonDelElement = elementItem.querySelector('.element__del');
  const buttonLikeElement = elementItem.querySelector('.element__like-button');
  buttonLikeElement.addEventListener('click', toggleClass);
  imgElement.alt = cardData.name;
  imgElement.src = cardData.link;
  titleElement.textContent = cardData.name;
  buttonDelElement.addEventListener('click', function() {
  elementItem.remove();})
  figCaptionPopupFullImage.textContent= titleElement.textContent;
  imgElement.addEventListener('click', function(){
  openPopup(popupFullImage);
  photoPopupFullImage.src = imgElement.src;
  photoPopupFullImage.alt = imgElement.alt;
  figCaptionPopupFullImage.textContent= titleElement.textContent;})
  return elementItem;}

function renderCard(data, container, position = 'append') {
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

function openNewCard() {
  openPopup(popupNewCard);
  }

function handleSubmitAdd(e) {
    e.preventDefault();
    const cardName = inputEditFormCardName.value;
    const cardUrl = inputEditFormCardUrl.value;
    const newCard = {
        name: cardName,
        link: cardUrl
    }
    renderCard(newCard, sectionElements, 'prepend');
    document.getElementById('editForm').reset();
    closePopup(popupNewCard);
    };

initialCards.forEach(function(item){
  renderCard(item, sectionElements, 'append' );
  })

buttonClosePopupList.forEach((item) => {
  item.addEventListener('click', function() {
  closePopup(item.closest('.popup'))});
  });

formEditUserInformation.addEventListener("submit", saveUserInformation);
buttonEditProfile.addEventListener("click", editUserInformation);
buttonCreateCard.addEventListener('click', openNewCard);
formAddNewCard.addEventListener('submit', handleSubmitAdd)






