"use strict";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const formElements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

export const popups = Array.from(document.querySelectorAll(".popup"));
export const popupPhoto = document.querySelector(".popup-photo");
export const popupCloseButton = document.querySelector(".popup__close ");
export const galleryList = document.querySelector(".gallery__list");
export const popupPhotoName = document.querySelector(".popup__caption");
export const popupImage = document.querySelector(".popup__image");
export const cardForm = document.querySelector(".popup__form_card");
export const profileForm = document.querySelector(".popup__form_profile");
export const nameCardFromPopup = cardForm.querySelector(
  ".popup__input_js_name-card"
);
export const inputCardFromPopup = cardForm.querySelector(
  ".popup__input_js_link-card"
);
export const nameInput = document.querySelector(".popup__input_js_name");
export const jobInput = document.querySelector(".popup__input_js_profession");
export const profileName = document.querySelector(".profile__name");
export const profileProfession = document.querySelector(".profile__profession");
export const profileEditButton = document.querySelector(".profile__edit");
export const cardAddButton = document.querySelector(".profile__add");

export const buttonClosePopupProfile = document.querySelector(
  ".close-profile-form"
);
export const buttonCloseCardForm = document.querySelector(".close-card-form");
export const buttonClosePopup = document.querySelector(".close-photo-popup");
export const popupProfile = document.querySelector(".popup-profile");
export const popupCard = document.querySelector(".popup-card");
