"use strict";
import { openPopup } from "./index.js";
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
    this._setEventListeners();
    this._element.querySelector(".card__name").textContent = this._name;
    this._element.querySelector(".card__photo").src = this._link;
    this._element.querySelector(
      ".card__photo"
    ).alt = `Фотография ${this._name}`;

    return this._element;
  }

  _toggleLike(likeButton) {
    likeButton.classList.toggle("card__like-button_active");
  }

  _openPopupImage() {
    popupPhotoName.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = `Фотография ${this._name}`;
    openPopup(popupPhoto);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    const cardPhoto = this._element.querySelector(".card__photo");
    const trashButton = this._element.querySelector(".card__trash-button");

    cardPhoto.addEventListener("click", () => {
      this._openPopupImage();
    });

    likeButton.addEventListener("click", () => {
      this._toggleLike(likeButton);
    });

    trashButton.addEventListener("click", () => {
      this._element.remove();
    });
  }
}
