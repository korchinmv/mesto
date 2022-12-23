"use strict";

const initialCards = [
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

const editButton = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_js_name");
const jobInput = formElement.querySelector(".popup__input_js_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const popupOpened = () => {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
};

const popupClose = () => {
  popup.classList.remove("popup_opened");
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popupClose();
};

formElement.addEventListener("submit", handleFormSubmit);
editButton.addEventListener("click", popupOpened);
closeButton.addEventListener("click", popupClose);
