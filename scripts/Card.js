"use strict";
import { openPopup } from "./index.js";
export const galleryList = document.querySelector(".gallery__list");
export const buttonLike = document.querySelector(".card__like-button");
export const cardPhoto = document.querySelector(".card__photo");
export const popupPhotoName = document.querySelector(".popup__caption");
export const popupImage = document.querySelector(".popup__image");
export const popupPhoto = document.querySelector(".popup-photo");

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
    this._element = this._setEventListeners();

    this._element.querySelector(".card__name").textContent = this._name;
    this._element.querySelector(".card__photo").src = this._link;
    this._element.querySelector(
      ".card__photo"
    ).alt = `Фотография ${this._name}`;

    return this._element;
  }

  _toggleLike() {
    buttonLike.classList.toggle("card__like-button_active");
  }

  _setEventListeners() {
    console.log(popupImage);
    popupImage.addEventListener("click", this._openPopupImage());
  }

  _openPopupImage() {
    popupPhotoName.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = `Фотография ${this._name}`;
    openPopup(popupPhoto);
  }
}

export const addedCardsInGallery = (initialCards) => {
  initialCards.forEach((item) => {
    const card = new Card(item, ".card-template");
    const cardElement = card.generateCard();
    galleryList.append(cardElement);
  });
};
