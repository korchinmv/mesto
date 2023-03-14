"use strict";

export class Card {
  constructor(
    card,
    templateSelector,
    currentUserId,
    { handleCardClick, handleDeleteIconClick, handleAddLike, handleDeleteLike }
  ) {
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._cardId = card._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._currentUserId = currentUserId;
    this._ownerCard = card.owner._id === currentUserId;
    this._liked = card.likes.find((user) => user._id === currentUserId);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector(".card__name");
    this._cardPhoto = this._element.querySelector(".card__photo");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeNum = this._element.querySelector(".card__like-num");
    this._likeNum.textContent = this._likes.length;
    this._trashButton = this._element.querySelector(".card__trash-button");
    this._cardName.textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = `Фотография ${this._name}`;

    //Проверка на пренадлежность карточки
    if (!this._ownerCard) {
      this._trashButton.remove();
    }
    //Проверяем лайкнута ли карточка нами
    this._cardLiked();

    this._setEventListeners();

    return this._element;
  }

  _cardLiked() {
    if (this._liked) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  updateLikes(arrLikes) {
    this._likes = arrLikes.likes;
    this._likeNum.textContent = this._likes.length;
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick(this._cardName, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.contains("card__like-button_active")
        ? this._handleDeleteLike(this._cardId)
        : this._handleAddLike(this._cardId);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this._cardId);
    });
  }
}
