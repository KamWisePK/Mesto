  export class Card {
    constructor(data, templateSelector, handleCardClick){
      this._alt = data.name;
      this._src = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }

    //создание каркаса карточки
    _getTemplate() {
      return document
          .querySelector(this._templateSelector)
          .content.querySelector('.element')
          .cloneNode(true);
  }  

    //наполнение каркаса картчоки
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

    //установка слушателей для всего функционала карточки
    _setEventListeners() {
      // слушатель события кнопки удаления и функция удаления карточки
      this._buttonDelElement.addEventListener("click",  () => {
        this._element.remove();
      });
     // слушатель события кнопки лайка и функция лайка
      this._buttonLikeElement.addEventListener("click", () => {
        this._buttonLikeElement.classList.toggle("element__like-button_active");
      });

      //слушатель события открытия картинки карточки и вызов функции открытия (сама функция в скрипте)
      this._imgElement.addEventListener('click', () =>{
      this._handleCardClick(this._alt, this._src);
      });
    }
  }

 

  