"use strict";
import { openPopup } from "./utils.js";
import { popupPhotoName, popupImage, popupPhoto } from "./variables.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._trashButton = this._element.querySelector(".card__trash-button");
    this._cardName.textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = `Фотография ${this._name}`;
    this._setEventListeners();

    return this._element;
  }

  _toggleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _openPopupImage() {
    popupPhotoName.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = `Фотография ${this._name}`;
    openPopup(popupPhoto);
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener("click", () => {
      this._openPopupImage();
    });

    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    this._trashButton.addEventListener("click", () => {
      this._deleteCard();
    });
  }
}
