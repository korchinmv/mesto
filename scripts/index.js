"use strict";

import { initialCards } from "./cards.js";

const cardForm = document.querySelector(".popup__form_card");
const profileForm = document.querySelector(".popup__form_profile");
const nameCardFromPopup = cardForm.querySelector(".popup__input_js_name-card");
const inputCardFromPopup = cardForm.querySelector(".popup__input_js_link-card");
const overlay = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__edit");
const cardOpenButton = document.querySelector(".profile__add");
const nameInput = overlay.querySelector(".popup__input_js_name");
const jobInput = overlay.querySelector(".popup__input_js_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const galleryList = document.querySelector(".gallery__list");
const popupImage = document.querySelector(".popup__image");
// const popupPhotoPopup = document.querySelector(".popup__photo");
const popupPhotoName = document.querySelector(".popup__caption");
const closeButtonProfileForm = document.querySelector(".close-profile-form");
const closeButtonCardForm = document.querySelector(".close-card-form");
const closeButtonPopup = document.querySelector(".close-photo-popup");
const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");
const popupPhoto = document.querySelector(".popup-photo");

//Открытие и закрытие оверлея c попапами//
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

//Открытие попапа профиля
profileEditButton.addEventListener("click", () => {
  openPopup(popupProfile);
});

//Открытие попапа добавления карточки
cardOpenButton.addEventListener("click", () => {
  openPopup(popupCard);
});

//Закрытие попапа профиля
closeButtonProfileForm.addEventListener("click", () => {
  closePopup(popupProfile);
  profileForm.reset();
});

//Закрытие попапа добавления карточки
closeButtonCardForm.addEventListener("click", () => {
  closePopup(popupCard);
  cardForm.reset();
});

//Редактирование профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfile);
  closePopup(overlay);
  profileForm.reset();
};
profileForm.addEventListener("submit", handleProfileFormSubmit);

//Создаем карточку
const createCard = (card) => {
  const templateCard = document.querySelector(".card-template").content;
  const newCard = templateCard.querySelector(".gallery__item").cloneNode(true);
  const cardPhoto = newCard.querySelector(".card__photo");
  const cardName = newCard.querySelector(".card__name");
  cardPhoto.src = card.link;
  cardPhoto.alt = `Фотография ${card.name}`;
  cardName.textContent = card.name;
  newCard.onerror = function () {
    newCard.src = "./images/gallery/error.gif";
  };

  newCard.addEventListener("click", (evt) => {
    const targetElement = evt.target;

    //Лайк карточке
    if (targetElement.classList.contains("card__like-button")) {
      targetElement.classList.toggle("card__like-button_active");
      return;
    }

    //Удаление карточки
    if (targetElement.classList.contains("card__trash-button")) {
      newCard.remove();
      return;
    }

    //Открытие попапа с фото
    if (targetElement.classList.contains("card__photo")) {
      popupPhotoName.textContent = targetElement.getAttribute("alt").slice(11);
      popupImage.src = targetElement.src;
      popupImage.alt = `${targetElement.getAttribute("alt")}`;
      openPopup(popupPhoto);
    }
  });
  return newCard;
};

//Закрытие попапа с фото

closeButtonPopup.addEventListener("click", () => {
  closePopup(popupPhoto);
});

//Добавление карточек из существуещего массива
const renderCards = (cards, place) => {
  cards.forEach((card) => {
    const cardHtml = createCard(card);
    place.append(cardHtml);
  });
};
renderCards(initialCards, galleryList);

//Добавление карточки на страницу из формы
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newObjCard = {
    name: nameCardFromPopup.value,
    link: inputCardFromPopup.value,
  };

  galleryList.prepend(createCard(newObjCard));
  closePopup(popupCard);
  cardForm.reset();
});
