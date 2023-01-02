"use strict";

import { initialCards } from "./cards.js";

const formCardPopup = document.querySelector(".popup__form_card");
const nameCardFromPopup = formCardPopup.querySelector(
  ".popup__input_js_name-card"
);
const inputCardFromPopup = formCardPopup.querySelector(
  ".popup__input_js_link-card"
);
const overlay = document.querySelector(".popup");
const profileOpenButton = document.querySelector(".profile__edit");
const popupProfile = document.querySelector(".popup__container_profile");
const cardOpenButton = document.querySelector(".profile__add");
const popupCard = document.querySelector(".popup__container_card");
const popupForm = overlay.querySelector(".popup__form");
const nameInput = overlay.querySelector(".popup__input_js_name");
const jobInput = overlay.querySelector(".popup__input_js_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const templateCard = document.querySelector(".card-template").content;
const galleryList = document.querySelector(".gallery__list");
const popupImage = document.querySelector(".popup__image");
const popupPhotoPopup = document.querySelector(".popup__photo");
const popupPhotoName = document.querySelector(".popup__caption");
const closeButtonProfileForm = document.querySelector(".close-profile-form");
const closeButtonCardForm = document.querySelector(".close-card-form");
const formCardActive = document.querySelector(".popup__container_card_active");
const closeButtonPopup = document.querySelector(".close-photo-popup");

//Открытие и закрытие оверлея//
const openOverlay = () => {
  overlay.classList.add("popup_opened");
};

const closeOverlay = () => {
  overlay.classList.remove("popup_opened");
};

//Открытие попапа профиля
const openPopupProfile = () => {
  popupProfile.classList.add("popup__container_profile_active");
  openOverlay();
};
profileOpenButton.addEventListener("click", openPopupProfile);

//Открытие попапа добавления карточки
const openPopupCard = () => {
  popupCard.classList.add("popup__container_card_active");
  openOverlay();
};
cardOpenButton.addEventListener("click", openPopupCard);

//Закрытие попапа профиля
const closeFormProfile = () => {
  popupProfile.classList.remove("popup__container_profile_active");
  clearFormCard();
  closeOverlay();
  clearInputProfile();
};
closeButtonProfileForm.addEventListener("click", closeFormProfile);

//Закрытие попапа карточки
const closeFormCard = () => {
  popupCard.classList.remove("popup__container_card_active");
  closeOverlay();
  clearFormCard();
};
closeButtonCardForm.addEventListener("click", closeFormCard);

//Очищаем инпуты у формы в профиле
const clearInputProfile = () => {
  nameInput.value = "";
  jobInput.value = "";
};

//Редактирование профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closeFormProfile(closeButtonProfileForm, popupProfile);
  closeOverlay();
  clearInputProfile();
};
popupForm.addEventListener("submit", handleProfileFormSubmit);

//Создаем карточку
const createCard = (card) => {
  const newCard = templateCard.querySelector(".gallery__item").cloneNode(true);
  newCard.querySelector(".card__photo").src = card.link;
  newCard.querySelector(".card__photo").alt = `Фотография ${card.name}`;
  newCard.querySelector(".card__name").textContent = card.name;
  newCard.onerror = function () {
    newCard.src = "./images/gallery/error.gif";
  };

  newCard.addEventListener("click", (evt) => {
    const targetElement = evt.target;

    //Лайк карточке
    if (targetElement.classList.contains("card__like-button")) {
      targetElement.classList.toggle("card__like-button_active");
    }

    //Удаление карточки
    if (targetElement.classList.contains("card__trash-icon")) {
      newCard.remove();
    }

    //Открытие попапа с фото
    if (targetElement.classList.contains("card__photo")) {
      popupPhotoName.textContent = targetElement.getAttribute("alt").slice(11);
      popupImage.src = targetElement.src;
      openOverlay();
      popupPhotoPopup.classList.add("popup__photo_opened");
    }
  });
  return newCard;
};

//Закрытие попапа с фото
const closePhotoPopup = () => {
  popupPhotoPopup.classList.remove("popup__photo_opened");
  closeOverlay();
};
closeButtonPopup.addEventListener("click", closePhotoPopup);

//Добавление карточек из существуещего массива
const renderCards = (cards, place) => {
  cards.forEach((card) => {
    const cardHtml = createCard(card);
    place.append(cardHtml);
  });
};
renderCards(initialCards, galleryList);

//Очищаем форму создания карточки
const clearFormCard = () => {
  nameCardFromPopup.value = "";
  inputCardFromPopup.value = "";
};

//Добавление карточки на страницу из формы
formCardPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newObjCard = {
    name: nameCardFromPopup.value,
    link: inputCardFromPopup.value,
  };

  galleryList.prepend(createCard(newObjCard));
  closeFormCard(closeButtonCardForm, formCardActive);
  closeOverlay();
  clearFormCard();
});
