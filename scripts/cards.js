  export class Card {
    constructor(data, templateSelector, handleCardClick){
      this._alt = data.name;
      this._src = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
     const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
     return cardElement;
    }   
    generateCard() {
      this._element = this._getTemplate();
      this._buttonLikeElement = this._element.querySelector(".element__like-button");
      this._buttonDelElement = this._element.querySelector(".element__del");
      this._imgElement = this._element.querySelector(".element__image");
      this._element.querySelector(".element__title").textContent = this._alt;
      this._imgElement.alt = this._alt;
      this._imgElement.src = this._src;
      this._setEventListeners();
      return this._element;
    } 

    _setEventListeners() {
      this._buttonDelElement.addEventListener("click",  () => {
        this._element.remove();
      });

      this._buttonLikeElement.addEventListener("click", () => {
        this._buttonLikeElement.classList.toggle("element__like-button_active");
      });

      this._imgElement.addEventListener('click', () =>{
      this._handleCardClick(this._alt, this.src);
      });
    }
  }

 

  