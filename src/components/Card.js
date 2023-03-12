"use strict";

export class Card {
  constructor(
    data,
    templateSelector,
    currentUserId,
    { handleCardClick, handleDeleteIconClick, handleLikeClick }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;
    this._ownerCard = data.owner._id === currentUserId;
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

    if (!this._ownerCard) {
      this._trashButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }

  _toggleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick(this._cardName, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteIconClick();
    });
  }
}
