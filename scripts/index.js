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
const closeButtonForm = overlay.querySelectorAll(".popup__close");
const profileOpenButton = document.querySelector(".profile__edit");
const popupProfile = document.querySelector(".popup__container_profile");
const cardOpenButton = document.querySelector(".profile__add");
const popupCard = document.querySelector(".popup__container_card");
const formSubmitButtons = document.querySelectorAll(".popup__save");

const popupForm = overlay.querySelector(".popup__form");
const nameInput = overlay.querySelector(".popup__input_js_name");
const jobInput = overlay.querySelector(".popup__input_js_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const popupImage = document.querySelector(".popup__image");
const popupPhotoPopup = document.querySelector(".popup__photo");
const popupPhotoName = document.querySelector(".popup__caption");

//Открытие и закрытие оверлея//
const openOverlay = () => {
  overlay.classList.add("popup_opened");
};

const closeOverlay = () => {
  overlay.classList.remove("popup_opened");
};

//Открытие попапа профиля
const openPopupProfile = () => {
  popupProfile.classList.add("popup-js_active");
  openOverlay();
};

profileOpenButton.addEventListener("click", openPopupProfile);

//Открытие попапа добавления карточки
const openPopupCard = () => {
  popupCard.classList.add("popup-js_active");
  openOverlay();
};

cardOpenButton.addEventListener("click", openPopupCard);

//Закрытие попапов по отправке формы
const closePopupForm = (buttons) => {
  buttons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      const parent = evt.target.closest(".popup-js");
      parent.classList.remove("popup-js_active");
      closeOverlay();
    });
  });
};

closePopupForm(closeButtonForm);
closePopupForm(formSubmitButtons);

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
  closePopupForm(formSubmitButtons);
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
      popupPhotoPopup.classList.add("popup-js_active");
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

//Добавление карточки на страницу из формы
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
  closePopupForm(formSubmitButtons);
  closeOverlay();
  clearFormCard();
});
