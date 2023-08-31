export class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleCardDelete,
    { handleCardLike }
  ) {
    this._data = data;
    this._alt = data.name;
    this._src = data.link;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  //создание каркаса карточки
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  //получение id
  getId() {
    return this._data._id;
  }

  //наполнение каркаса картчоки
  generateCard() {
    this._element = this._getTemplate();   
    this._buttonDelElement = this._element.querySelector(".element__del");
    this._imgElement = this._element.querySelector(".element__image");
    this._element.querySelector(".element__title").textContent = this._alt;
    this._buttonLikeElement = this._element.querySelector(".element__like-button");
    this._cardLikeCounter = this._element.querySelector(".element__like-count");
    this._imgElement.alt = this._alt;
    this._imgElement.src = this._src;
    this.setLikes(this._data);
    this._setEventListeners();

    if (this._userId !== this._data.owner._id) {
      this._buttonDelElement.remove();
      this._buttonDelElement = null;
    }

    return this._element;
  }

  
  isLiked() {
    return this._data.likes.some((item) => {
      return  item._id === this._userId;
    })
  }

  //постановка лайка и дизлайка
  _updateLike() {
    this._cardLikeCounter.textContent = this._data.likes.length;
    if (this.isLiked()) {
      this._buttonLikeElement.classList.add('element__like-button_active');
    } else {
      this._buttonLikeElement.classList.remove('element__like-button_active');
    }
  }
  
  setLikes(data) {
    this._data.likes = data.likes;
    this._updateLike();
  }

  //установка слушателей для всего функционала карточки
  _setEventListeners() {
    this._buttonLikeElement.addEventListener('click', () => {
      this._handleCardLike(this);
    });
    
    if (this._userId === this._data.owner._id) {
      this._buttonDelElement.addEventListener('click', () => this._handleCardDelete(this))
    }

    this._imgElement.addEventListener('click', () => {
      this._handleCardClick(this._alt, this._src);
    });
  }
    
        // // слушатель события кнопки удаления и функция удаления карточки
    // this._buttonDelElement.addEventListener("click", () => {
    //   this._element.remove();
    // });
    // // слушатель события кнопки лайка и функция лайка
    // this._buttonLikeElement.addEventListener("click", () => {
    //   this._buttonLikeElement.classList.toggle("element__like-button_active");
    // });

    // //слушатель события открытия картинки карточки и вызов функции открытия (сама функция в скрипте)
    // this._imgElement.addEventListener("click", () => {
    //   this._handleCardClick(this._alt, this._src);
    // });
  
}
