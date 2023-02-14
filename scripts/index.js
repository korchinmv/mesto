"use strict";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  popupPhoto,
  cardForm,
  profileForm,
  nameCardFromPopup,
  inputCardFromPopup,
  profileEditButton,
  cardOpenButton,
  nameInput,
  jobInput,
  profileName,
  profileProfession,
  buttonClosePopupProfile,
  buttonCloseCardForm,
  buttonClosePopup,
  popupProfile,
  popupCard,
  initialCards,
  galleryList,
  formElements,
} from "./variables.js";

//Создаем новую карточку на основе класса Card
const createNewCard = (item, position) => {
  const card = new Card(item, ".card-template");

  const cardElement = card.generateCard();

  if (position === "append") {
    galleryList.append(cardElement);
  } else {
    galleryList.prepend(cardElement);
  }
};

//Добавляем карточки на страницу
const addedCardsInGalleryFromDataCards = (initialCards) => {
  initialCards.forEach((item) => {
    createNewCard(item, "append");
  });
};
addedCardsInGalleryFromDataCards(initialCards);

//Создаем экземпляры класса валидации для отдельной формы
const cardFormValidate = new FormValidator(formElements, cardForm);
const profileFormValidate = new FormValidator(formElements, profileForm);

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

    createNewCard(newObjCard, "prepend");
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
  profileFormValidate.enableValidation();
});

//Открытие попапа добавления карточки
cardOpenButton.addEventListener("click", () => {
  openPopup(popupCard);
  cardFormValidate.enableValidation();
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

//Закрытие попапа с фото
buttonClosePopup.addEventListener("click", () => {
  closePopup(popupPhoto);
});
