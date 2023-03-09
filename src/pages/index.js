"use strict";

import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  TOKEN,
  URL,
  profileName,
  profileProfession,
  profileAvatar,
  cardForm,
  profileForm,
  jobInput,
  nameInput,
  profileEditButton,
  cardAddButton,
  initialCards,
  formElements,
} from "../utils/variables.js";
import { Api } from "../components/Api";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

//Функция добавления данных в профиль
const addDataUserInProfile = (name, proffesion, avatar, data) => {
  name.textContent = data.name;
  proffesion.textContent = data.about;
  avatar.src = data.avatar;
};

//Загрузка информации о пользователе с серверa
const api = new Api(URL, TOKEN);

api
  .getUser()
  .then((data) => {
    addDataUserInProfile(profileName, profileProfession, profileAvatar, data);
  })
  .catch((err) => {
    console.log(err);
  });

//Загрузка карточек с сервера
api
  .getCards()
  .then((data) => {
    console.log(data[0]);
    const cardElementAddToPage = new Section(
      {
        items: data,
        renderer: (cardItem) => {
          cardElementAddToPage.setItem(createCard(cardItem));
        },
      },
      ".gallery__list"
    );

    cardElementAddToPage.addItem();
  })
  .catch((err) => {
    console.log(err);
  });

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

  profileFormValidate.resetValidation();
  profilePopup.open();
});

//Открытие попапа добавления карточки
cardAddButton.addEventListener("click", () => {
  cardFormValidate.resetValidation();
  cardPopup.open();
});
