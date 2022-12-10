"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.querySelector(".profile__edit");
  const popup = document.querySelector(".popup");
  const closeButton = document.querySelector(".popup__close");
  const formElement = popup.querySelector(".popup__form");
  const nameInput = formElement.querySelector(".popup__name");
  const jobInput = formElement.querySelector(".popup__profession");
  const profileName = document.querySelector(".profile__name");
  const profileProfession = document.querySelector(".profile__profession");

  console.log(profileName);
  console.log(profileProfession);

  const popupOpened = () => {
    popup.classList.add("popup_opened");
  };

  const popupClose = () => {
    popup.classList.remove("popup_opened");
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;

    console.log(profileName);
    console.log(profileProfession);
    popupClose();
  };

  formElement.addEventListener("submit", handleFormSubmit);
  editButton.addEventListener("click", popupOpened);
  closeButton.addEventListener("click", popupClose);
});
