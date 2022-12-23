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

const openPopupButtons = document.querySelectorAll("[data-path]");
const overlay = document.querySelector(".popup");
const closeButtonForm = overlay.querySelectorAll(".popup__close");
const nameInput = overlay.querySelector(".popup__input_js_name");
const jobInput = overlay.querySelector(".popup__input_js_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const modals = overlay.querySelectorAll(".popup__container");

//Закрытие-открытие модальных окон//
const openOverlay = () => {
  overlay.classList.add("popup_opened");
};

const closeOverlay = () => {
  overlay.classList.remove("popup_opened");
};

const popupOpen = (evt) => {
  const path = evt.currentTarget.getAttribute("data-path");

  document
    .querySelector(`[data-target="${path}"]`)
    .classList.add("popup__container_opened");

  openOverlay();
};

const popupClose = () => {
  modals.forEach((modal) => {
    modal.classList.remove("popup__container_opened");
  });

  closeOverlay();
};

openPopupButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    popupOpen(evt);
  });
});

closeButtonForm.forEach((button) => {
  button.addEventListener("click", () => {
    popupClose();
  });
});

//Редактирование профиля//
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popupClose();
  closeOverlay();
};

overlay.addEventListener("submit", handleProfileFormSubmit);

//Добавление карточки//
