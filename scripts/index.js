"use strict";
import { Card } from "./Card.js";
import { openPopup, closePopup } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import {
  popupPhoto,
  popups,
  cardForm,
  profileForm,
  nameCardFromPopup,
  inputCardFromPopup,
  nameInput,
  jobInput,
  profileName,
  profileProfession,
  buttonCloseCardForm,
  buttonClosePopup,
  popupProfile,
  popupCard,
  initialCards,
  galleryList,
  formElements,
} from "./variables.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";

const profilePopup = new Popup(popupProfile);
profilePopup.setEventListeners();

const photoPopup = new PopupWithImage(popupPhoto);

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

    // createCard(newObjCard);
    // renderCard(newObjCard, "");
    closePopup(popupCard);
    cardForm.reset();
    cardFormValidate.resetValidation();
  });
};
handleCardFormSubmit(cardForm);

// //Открытие попапа профиля
// profileEditButton.addEventListener("click", () => {
//   addNameAndJobInForm(profileName, profileProfession, nameInput, jobInput);
//   openPopup(popupProfile);
// });

// //Открытие попапа добавления карточки
// cardOpenButton.addEventListener("click", () => {
//   openPopup(popupCard);
// });

// //Закрытие попапа профиля
// buttonClosePopupProfile.addEventListener("click", () => {
//   closePopup(popupProfile);
//   profileForm.reset();
//   profileFormValidate.resetValidation();
// });

// //Установка слушателя закрытия на попапы
// popups.forEach((popup) => {
//   popup.addEventListener("click", closePopupByClickOnOverlay);
// });

//Закрытие попапа добавления карточки
buttonCloseCardForm.addEventListener("click", () => {
  closePopup(popupCard);
  cardForm.reset();
  cardFormValidate.resetValidation();
});

// //Закрытие попапа с фото
// buttonClosePopup.addEventListener("click", () => {
//   closePopup(popupPhoto);
// });

//Закрытие попапа по нажатию "Esc"
export const closePopupByPressEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};
