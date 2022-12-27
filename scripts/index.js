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
const formCardPopup = document.querySelector(".popup__form_card");

const nameCardFromPopup = formCardPopup.querySelector(
  ".popup__input_js_name-card"
);
const inputCardFromPopup = formCardPopup.querySelector(
  ".popup__input_js_link-card"
);

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

//Добавление и удаления класса ошибки в инпут
const showErrorPopupCard = (link) => {
  link.classList.add("popup__input_js_link-card-error");
  link.value = "Неверно указана ссылка";
};

const clearErrorPopupCard = (name, link) => {
  name.value = "";
  link.classList.remove("popup__input_js_link-card-error");
  link.value = "test";
  console.log("hi");
};

//Открытие и закрытие попапа редактирования карточки
const cardOpenButton = document.querySelector(".profile__add");
const popupCard = document.querySelector(".popup__container_card");

const openPopupCard = () => {
  popupCard.classList.add("popup__container_card_opened");
  openOverlay();
};

const closePopupCard = () => {
  popupCard.classList.remove("popup__container_card_opened");
  closeOverlay();
  clearErrorPopupCard(nameCardFromPopup, inputCardFromPopup);
};

cardOpenButton.addEventListener("click", openPopupCard);
closeButtonForm.forEach((button) => {
  button.addEventListener("click", (evt) => {
    closePopupCard(evt.target);
  });
});

//Редактирование профиля//
const popupForm = overlay.querySelector(".popup__form");
const nameInput = overlay.querySelector(".popup__input_js_name");
const jobInput = overlay.querySelector(".popup__input_js_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const clearInputProfile = () => {
  nameInput.value = "";
  jobInput.value = "";
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopupProfile();
  closeOverlay();
  clearInputProfile();
};

popupForm.addEventListener("submit", handleProfileFormSubmit);

//Добавление карточек из массива//
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

//Добавление новой карточки из формы

const addNewCard = (linkFromPopup, nameFromPopup) => {
  const newCard = templateCard.querySelector(".gallery__item").cloneNode(true);

  newCard.querySelector(".card__photo").src = linkFromPopup.value;
  newCard.querySelector(".card__name").textContent = nameFromPopup.value;
  return newCard;
};

formCardPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (
    inputCardFromPopup.value.toLowerCase().includes("https://") ||
    inputCardFromPopup.value.toLowerCase().includes("http://")
  ) {
    galleryList.prepend(addNewCard(inputCardFromPopup, nameCardFromPopup));
    closePopupCard();
    closeOverlay();
    clearErrorPopupCard(nameCardFromPopup, inputCardFromPopup);
  }

  showErrorPopupCard(inputCardFromPopup);
  return;
});
