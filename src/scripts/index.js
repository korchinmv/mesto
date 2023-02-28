"use strict";

import "../pages/index.css";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  popupPhoto,
  cardForm,
  profileForm,
  jobInput,
  nameInput,
  profileName,
  profileProfession,
  profileEditButton,
  cardAddButton,
  popupProfile,
  popupCard,
  initialCards,
  galleryList,
  formElements,
} from "./variables.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

//Добавляем карточки из массива на страницу с помощью класса Section
const cardListFromArray = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, ".card-template", {
        handleCardClick: (card) => {
          photoPopup.open(card);
        },
      });
      const cardElement = card.generateCard();

      cardListFromArray.setItem(cardElement);
    },
  },
  galleryList
);

cardListFromArray.addItem();

// Получает данные о пользователе
const userInfo = new UserInfo({ name: profileName, job: profileProfession });

//Добавляем классы попапам редактирования профиля и добавления карточки
const profilePopup = new PopupWithForm(popupProfile, {
  handleFormSubmit: (dataForm) => {
    userInfo.setUserInfo(dataForm);
    profilePopup.close();
  },
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(popupCard, {
  handleFormSubmit: (dataForm) => {
    const newCard = new Card(dataForm, ".card-template", {
      handleCardClick: (card) => {
        photoPopup.open(card);
      },
    });
    cardListFromArray.setItem(newCard);
    profilePopup.close();
  },
});

cardPopup.setEventListeners();

//Добавляем класс попапу с картинкой
const photoPopup = new PopupWithImage(popupPhoto);
photoPopup.setEventListeners();

//Создаем экземпляры класса валидации для отдельной формы
const cardFormValidate = new FormValidator(formElements, cardForm);
const profileFormValidate = new FormValidator(formElements, profileForm);
profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

//Открытие попапа профиля
profileEditButton.addEventListener("click", () => {
  const infoAboutUser = userInfo.getUserInfo();

  //Добавляем имя и профессию в инпуты формы
  nameInput.value = infoAboutUser.username;
  jobInput.value = infoAboutUser.job;

  profilePopup.open();
});

//Открытие попапа добавления карточки
cardAddButton.addEventListener("click", () => {
  cardPopup.open();
});
