const initialCards = [
  {
    name: 'Какое-',
    link: 'https://otkritkis.com/wp-content/uploads/2022/07/guyrl.gif'
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

let formElement = document.querySelector(".popup_type_profile");
let profileEditButton = document.querySelector(".profile__edit-btn");
let closeButton = document.querySelectorAll(".popup__close-btn");
let nameInput = document.querySelector(".edit-form__input_type_name");
let jobInput = document.querySelector(".edit-form__input_type_job");
let nameOutput = document.querySelector(".profile__info-name");
let jobOutput = document.querySelector(".profile__info-job");
const elementsElement = document.querySelector('.elements');
const templateElement = document.querySelector("#card-template").content.querySelector('.element');
const popupImg = document.querySelector('.popup__img');
const cardCreateButton = document.querySelector(".profile__add-btn");
const cardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = cardPopup.querySelector('.edit-form');
const addCardNameInput = document.querySelector('.edit-form__input_type_card-name');
const addCardUrlInput = document.querySelector('.edit-form__input_type_card-url');

function editUserInf() {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent; 
  formElement.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closeButton.forEach((item) => {
  item.addEventListener('click', function() {
    closePopup(item.closest('.popup'))});
});

function saveUserInf(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  closePopup(formElement);
}

function createElement(name, src) {
  const elementItem = templateElement.cloneNode(true);
  const titleElement = elementItem.querySelector('.element__title');
  const imgElement = elementItem.querySelector('.element__image');
  const buttonDelElement = elementItem.querySelector('.element__del');
  const likeButton = elementItem.querySelector('.element__like-button');
  likeButton.addEventListener('click', function(event) {
  event.target.classList.toggle('element__like-button_active');});
  imgElement.alt = name;
  imgElement.src = src;
  titleElement.textContent = name;
  buttonDelElement.addEventListener('click', function() {
  elementItem.remove();})
  const imgPopup = document.querySelector('.popup_type_img'); 
  const popupImage = document.querySelector('.popup__img');
  const figCaption = document.querySelector('.popup__figcaption');
  figCaption.textContent= titleElement.textContent;
  imgElement.addEventListener('click', function(){
  imgPopup.classList.add("popup_opened");
  popupImage.src = imgElement.src;
  figCaption.textContent= titleElement.textContent;})
  return elementItem;}

function renderCard(data, container, position = 'append') {
    switch (position) {
      case "append":
    container.append(createElement(data.name, data.link));
    break;
    case "prepend":
      container.prepend(createElement(data.name, data.link));
      break;
      default:
        break;
  }
  }

initialCards.forEach(function(item){
    renderCard(item, elementsElement, 'append' );
  })

function createNewCard() {
  cardPopup.classList.add("popup_opened");
  }

function handleSubmitAdd(e) {
    e.preventDefault();
    const cardName = addCardNameInput.value;
    const cardUrl = addCardUrlInput.value;
    const newCard = {
        name: cardName,
        link: cardUrl
    }
    renderCard(newCard, elementsElement, 'prepend');
    closePopup(cardPopup);
    return newCard;
    };


formElement.addEventListener("submit", saveUserInf);
profileEditButton.addEventListener("click", editUserInf);
cardCreateButton.addEventListener('click', createNewCard);
addCardForm.addEventListener('submit', handleSubmitAdd)






