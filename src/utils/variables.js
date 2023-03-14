"use strict";

export const formElements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

export const TOKEN = "5fed34a4-12fb-4e00-a0af-c237a59bdc22";
export const URL = "https://mesto.nomoreparties.co/v1/cohort-61/";

export const popups = Array.from(document.querySelectorAll(".popup"));
export const popupCloseButton = document.querySelector(".popup__close ");
export const cardForm = document.querySelector(".popup__form_card");
export const profileForm = document.querySelector(".popup__form_profile");
export const avatarForm = document.querySelector(".popup__form_avatar");
export const nameCardFromPopup = cardForm.querySelector(
  ".popup__input_js_name-card"
);
export const galleryContainer = document.querySelector(".gallery__list");
export const inputCardFromPopup = cardForm.querySelector(
  ".popup__input_js_link-card"
);
export const nameInput = document.querySelector(".popup__input_js_name");
export const jobInput = document.querySelector(".popup__input_js_profession");
export const profileEditButton = document.querySelector(".profile__edit");
export const cardAddButton = document.querySelector(".profile__add");
export const editAvatarButton = document.querySelector(".profile__avatar-btn");
export const buttonClosePopupProfile = document.querySelector(
  ".close-profile-form"
);
export const buttonCloseCardForm = document.querySelector(".close-card-form");
export const buttonClosePopup = document.querySelector(".close-photo-popup");
