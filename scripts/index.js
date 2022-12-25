"use strict";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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

//Открытие и закрытие попапа редактирования карточки
const cardOpenButton = document.querySelector(".profile__add");
const popupCard = document.querySelector(".popup__container_card");

const openPopupCard = () => {
  popupCard.classList.add("popup__container_card_opened");
  openOverlay();
};

const closePopupCard = (evt) => {
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
const nameInput = overlay.querySelector(".popup__input_js_name");
const jobInput = overlay.querySelector(".popup__input_js_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopupProfile();
  closeOverlay();
};

overlay.addEventListener("submit", handleProfileFormSubmit);

//Добавление карточки//
const templateCard = document.querySelector(".card-template").content;
const galleryList = document.querySelector(".gallery__list");

const createCard = (card) => {
  const newCard = templateCard.querySelector(".gallery__item").cloneNode(true);

  newCard.querySelector(".card__photo").src = card.link;
  newCard.querySelector(".card__name").textContent = card.name;

  return newCard;
};

const renderCards = (cards, place) => {
  cards.forEach((card) => {
    const cardHtml = createCard(card);
    place.append(cardHtml);
  });
};

renderCards(initialCards, galleryList);
