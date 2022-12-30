"use strict";

import { initialCards } from "./cards.js";

const formCardPopup = document.querySelector(".popup__form_card");
const nameCardFromPopup = formCardPopup.querySelector(
  ".popup__input_js_name-card"
);
const inputCardFromPopup = formCardPopup.querySelector(
  ".popup__input_js_link-card"
);

//Открытие и закрытие оверлея//
const overlay = document.querySelector(".popup");
const closeButtonForm = overlay.querySelectorAll(".popup__close");

const openOverlay = () => {
  overlay.classList.add("popup_opened");
};

const closeOverlay = () => {
  overlay.classList.remove("popup_opened");
};

//Открытие и закрытие попапа профиля
const profileOpenButton = document.querySelector(".profile__edit");
const popupProfile = document.querySelector(".popup__container_profile");

const openPopupProfile = () => {
  popupProfile.classList.add("popup__container_profile_opened");
  openOverlay();
};

const closePopupProfile = () => {
  popupProfile.classList.remove("popup__container_profile_opened");
  closeOverlay();
};

profileOpenButton.addEventListener("click", openPopupProfile);
closeButtonForm.forEach((button) => {
  button.addEventListener("click", (evt) => {
    closePopupProfile(evt.target);
  });
});

//Открытие и закрытие попапа добавления карточки
const cardOpenButton = document.querySelector(".profile__add");
const popupCard = document.querySelector(".popup__container_card");

const openPopupCard = () => {
  popupCard.classList.add("popup__container_card_opened");
  openOverlay();
};

const closePopupCard = () => {
  popupCard.classList.remove("popup__container_card_opened");
  closeOverlay();
};

cardOpenButton.addEventListener("click", openPopupCard);

closeButtonForm.forEach((button) => {
  button.addEventListener("click", (evt) => {
    closePopupCard(evt.target);
  });
});

//Редактирование профиля//
const popupForm = overlay.querySelector(".popup__form");
const nameInput = overlay.querySelector(".popup__input_js_name");
const jobInput = overlay.querySelector(".popup__input_js_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

//Очищаем инпуты
const clearInputProfile = () => {
  nameInput.value = "";
  jobInput.value = "";
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopupProfile();
  closeOverlay();
  clearInputProfile();
};

popupForm.addEventListener("submit", handleProfileFormSubmit);

//Создаем карточку
const templateCard = document.querySelector(".card-template").content;
const galleryList = document.querySelector(".gallery__list");

const createCard = (card) => {
  const newCard = templateCard.querySelector(".gallery__item").cloneNode(true);
  newCard.querySelector(".card__photo").src = card.link;
  newCard.querySelector(".card__name").textContent = card.name;
  newCard.onerror = function () {
    newCard.src = "./images/gallery/error.gif";
  };

  newCard.addEventListener("click", (evt) => {
    const targetElement = evt.target;
    //Лайк карточке
    if (targetElement.classList.contains("card__like-icon")) {
      targetElement.classList.toggle("card__like-icon_active");
    }

    if (targetElement.classList.contains("card__like-icon_active")) {
      targetElement.src = "./images/svg/like-active.svg";
    } else {
      targetElement.src = "./images/svg/like.svg";
    }

    //Удаление карточки
    if (targetElement.classList.contains("card__trash-icon")) {
      newCard.remove();
    }
  });

  return newCard;
};

//Добавление карточек из существуещего массива
const renderCards = (cards, place) => {
  cards.forEach((card) => {
    const cardHtml = createCard(card);
    place.append(cardHtml);
  });
};

renderCards(initialCards, galleryList);

//Слушатель добавление карточки из формы
const clearFormCard = () => {
  nameCardFromPopup.value = "";
  inputCardFromPopup.value = "";
};

formCardPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newObjCard = {
    name: nameCardFromPopup.value,
    link: inputCardFromPopup.value,
  };

  galleryList.prepend(createCard(newObjCard));
  closePopupCard();
  closeOverlay();
  clearFormCard();
});
