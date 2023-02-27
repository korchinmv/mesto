"use strict";
import "../pages/index.css";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  popupPhoto,
  cardForm,
  profileForm,
  nameCardFromPopup,
  inputCardFromPopup,
  nameInput,
  jobInput,
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

//Получает данные о пользователе
const userInfo = new UserInfo(profileName, profileProfession);
userInfo.getUserInfo();

//Добавляем классы попапам редактирования профиля и добавления карточки
const profilePopup = new PopupWithForm(popupProfile, {
  formSubmit: () => {},
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(popupCard, {
  formSubmit: () => {},
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

//Добавление карточки на страницу из формы
const handleCardFormSubmit = (cardForm) => {
  cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const newObjCard = {
      name: nameCardFromPopup.value,
      link: inputCardFromPopup.value,
    };

    cardForm.reset();
    cardFormValidate.resetValidation();
  });
};
handleCardFormSubmit(cardForm);

//Открытие попапа профиля
profileEditButton.addEventListener("click", () => {
  profilePopup.open();
});

//Открытие попапа добавления карточки
cardAddButton.addEventListener("click", () => {
  cardPopup.open();
});
