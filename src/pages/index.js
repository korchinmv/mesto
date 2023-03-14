"use strict";
let currentUserId;
import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  TOKEN,
  URL,
  cardForm,
  profileForm,
  avatarForm,
  jobInput,
  nameInput,
  profileEditButton,
  galleryContainer,
  cardAddButton,
  editAvatarButton,
  formElements,
} from "../utils/variables.js";
import { Api } from "../components/Api";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";

// Получаем данные о пользователе
const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__profession",
  avatar: ".profile__avatar",
});

//Загрузка информации о пользователе с серверa
const api = new Api(URL, TOKEN);

//Функция создания карточки
const createCard = (cardItem, currentUserId) => {
  const card = new Card(cardItem, ".card-template", currentUserId, {
    handleCardClick: (cardName, link) => {
      photoPopup.open(cardName, link);
    },

    handleDeleteIconClick: (cardId) => {
      confirmationPopup.open();
      confirmationPopup.handleConfirmation(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            confirmationPopup.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },

    handleAddLike: (cardId) => {
      api
        .addLike(cardId)
        .then((data) => {
          card.updateLikes(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDeleteLike: (cardId) => {
      api
        .deleteLike(cardId)
        .then((data) => {
          card.updateLikes(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const cardElement = card.generateCard();
  return cardElement;
};

//Загрузка карточек с сервера и получаем текущего юзера
Promise.all([api.getUser(), api.getCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    currentUserId = user._id;

    const cardElementAddToPage = new Section(
      {
        items: cards,
        renderer: (cardItem) => {
          cardElementAddToPage.setItem(createCard(cardItem, currentUserId));
        },
      },
      ".gallery__list"
    );

    cardElementAddToPage.addItem();
  })
  .catch((err) => {
    console.log(err);
  });

//Добавляем классы попапам редактирования профиля и добавления карточки
const profilePopup = new PopupWithForm(".popup-profile", {
  handleFormSubmit: (dataForm) => {
    //Редактирование профиля
    api
      .sendProfile(dataForm)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });

    profilePopup.close();
  },
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(".popup-card", {
  handleFormSubmit: (dataForm) => {
    api
      .sendCard(dataForm)
      .then((data) => {
        galleryContainer.prepend(createCard(data, currentUserId));
      })
      .catch((err) => {
        console.log(err);
      });

    cardPopup.close();
  },
});
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup-edit-avatar", {});
avatarPopup.setEventListeners();
//Создаем экземпляр класса попапа для подтверждения удаления карточки
const confirmationPopup = new PopupWithConfirmation(".popup-delete");
confirmationPopup.setEventListeners();

//Добавляем класс попапу с картинкой
const photoPopup = new PopupWithImage(".popup-photo");
photoPopup.setEventListeners();

//Создаем экземпляры класса валидации для отдельной формы
const cardFormValidate = new FormValidator(formElements, cardForm);
const profileFormValidate = new FormValidator(formElements, profileForm);
const avatarFormValidate = new FormValidator(formElements, avatarForm);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();
avatarFormValidate.enableValidation();

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

//Открытие попапа редактирования аватарки
editAvatarButton.addEventListener("click", () => {
  avatarFormValidate.resetValidation();
  avatarPopup.open();
});
