"use strict";
import { initialCards } from "./cards.js";
import { formElements } from "./validate.js";
import { disabledButton } from "./validate.js";
import {
  galleryList,
  Card,
  addedCardsInGallery,
  buttonLike,
  cardPhoto,
  popupPhotoName,
  popupImage,
  popupPhoto,
} from "./Card.js";

addedCardsInGallery(initialCards);

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
// const galleryList = document.querySelector(".gallery__list");

const buttonClosePopupProfile = document.querySelector(".close-profile-form");
const buttonCloseCardForm = document.querySelector(".close-card-form");
const buttonClosePopup = document.querySelector(".close-photo-popup");
const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");

//Заполнение формы данными из профиля
const addNameAndJobInForm = (
  profileName,
  profileProfession,
  nameInput,
  jobInput
) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
};

//Редактирование профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfile);
  profileForm.reset();
};
profileForm.addEventListener("submit", handleProfileFormSubmit);

//Добавление карточки на страницу из формы
const handleCardFormSubmit = (cardForm) => {
  cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const newObjCard = {
      name: nameCardFromPopup.value,
      link: inputCardFromPopup.value,
    };

    // galleryList.prepend(createCard(newObjCard));
    closePopup(popupCard);
    cardForm.reset();
  });
};
handleCardFormSubmit(cardForm);

//Закрытие попапа по нажатию "Esc"
const closePopupByPressEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

//Закрытие попапа "клик по оверлею"
const closePopupByClickOnOverlay = (evt) => {
  const popupOpened = document.querySelector(".popup_opened");
  const targetElement = evt.target;

  if (targetElement.classList.contains("popup_opened")) {
    closePopup(popupOpened);
  }
};

//Открытие и закрытие оверлея c попапами//
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByPressEsc);
  document.addEventListener("click", closePopupByClickOnOverlay);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("click", closePopupByClickOnOverlay);
  document.removeEventListener("keydown", closePopupByPressEsc);
};

//Открытие попапа профиля
profileEditButton.addEventListener("click", () => {
  addNameAndJobInForm(profileName, profileProfession, nameInput, jobInput);
  openPopup(popupProfile);
  disabledButton(formElements);
});

//Открытие попапа добавления карточки
cardOpenButton.addEventListener("click", () => {
  openPopup(popupCard);
  disabledButton(formElements);
});

//Закрытие попапа профиля
buttonClosePopupProfile.addEventListener("click", () => {
  closePopup(popupProfile);
  profileForm.reset();
});

//Закрытие попапа добавления карточки
buttonCloseCardForm.addEventListener("click", () => {
  closePopup(popupCard);
  cardForm.reset();
});

//Создаем карточку
// const createCard = (card) => {
//   const templateCard = document.querySelector(".card-template").content;
//   const newCard = templateCard.querySelector(".gallery__item").cloneNode(true);
//   const cardPhoto = newCard.querySelector(".card__photo");
//   const cardName = newCard.querySelector(".card__name");
//   const buttonLike = newCard.querySelector(".card__like-button");
//   const buttonTrashCard = newCard.querySelector(".card__trash-button");

//   cardName.textContent = card.name;
//   cardPhoto.src = card.link;
//   cardPhoto.alt = `Фотография ${card.name}`;
//   cardPhoto.onerror = function () {
//     cardPhoto.src = "./images/gallery/error.gif";
//   };

//   buttonLike.addEventListener("click", (evt) => {
//     const targetElement = evt.target;
//     targetElement.classList.toggle("card__like-button_active");
//   });

//   buttonTrashCard.addEventListener("click", () => {
//     newCard.remove();
//   });

//   cardPhoto.addEventListener("click", () => {
//     popupPhotoName.textContent = card.name;
//     popupImage.src = card.link;
//     popupImage.alt = `Фотография ${card.name}`;
//     openPopup(popupPhoto);
//   });

//   return newCard;
// };

//Закрытие попапа с фото
buttonClosePopup.addEventListener("click", () => {
  closePopup(popupPhoto);
});

//Добавление карточек из существуещего массива
// const renderCards = (cards, place) => {
//   cards.forEach((card) => {
//     const cardHtml = createCard(card);
//     place.append(cardHtml);
//   });
// };
// renderCards(initialCards, galleryList);
