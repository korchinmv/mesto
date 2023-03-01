"use strict";

import "../pages/index.css";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  cardForm,
  profileForm,
  jobInput,
  nameInput,
  profileEditButton,
  cardAddButton,
  initialCards,
  formElements,
} from "./variables.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

//Добавляем карточки из массива на страницу с помощью класса Section
const addCardToPage = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, ".card-template", {
        handleCardClick: (cardName, link) => {
          photoPopup.open(cardName, link);
        },
      });

      const cardElement = card.generateCard();

      addCardToPage.setItem(cardElement);
    },
  },
  ".gallery__list"
);

addCardToPage.addItem();

// Получаем данные о пользователе
const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__profession",
});

//Добавляем классы попапам редактирования профиля и добавления карточки
const profilePopup = new PopupWithForm(".popup-profile", {
  handleFormSubmit: (dataForm) => {
    userInfo.setUserInfo(dataForm);
    profilePopup.close();
  },
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(".popup-card", {
  handleFormSubmit: (dataForm) => {
    //Создаем новый экземпляр карточки из попапа
    const card = new Card(dataForm, ".card-template", {
      handleCardClick: (card) => {
        photoPopup.open(card);
      },
    });
    const cardElement = card.generateCard();

    //Добавляем на страницу
    addCardToPage.setItem(cardElement);

    cardPopup.close();
  },
});

cardPopup.setEventListeners();

//Добавляем класс попапу с картинкой
const photoPopup = new PopupWithImage(".popup-photo");
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
