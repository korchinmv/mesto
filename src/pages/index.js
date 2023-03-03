"use strict";

import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  cardForm,
  profileForm,
  jobInput,
  nameInput,
  profileEditButton,
  cardAddButton,
  initialCards,
  formElements,
} from "../utils/variables.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

//Функция создания карточки
const createCard = (cardItem) => {
  const card = new Card(cardItem, ".card-template", {
    handleCardClick: (cardName, link) => {
      photoPopup.open(cardName, link);
    },
  });

  const cardElement = card.generateCard();
  return cardElement;
};

//Добавляем карточки из массива на страницу с помощью класса Section
const cardElementAddToPage = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      cardElementAddToPage.setItem(createCard(cardItem));
    },
  },
  ".gallery__list"
);

cardElementAddToPage.addItem();

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
    cardElementAddToPage.setItem(createCard(dataForm));
    cardPopup.close();
  },

  resetValidation: (inputList) => {
    cardFormValidate.resetValidation(inputList);
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
