"use strict";

import { handleProfileFormSubmit } from "./index.js";
import { handleCardFormSubmit } from "./index.js";

const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error");
};

export const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error");
  errorElement.textContent = "";
};

const checkInputValidity = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const invalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, button) => {
  if (invalidInput(inputList)) {
    button.classList.add("popup__save_disabled");
  } else {
    button.classList.remove("popup__save_disabled");
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__save");

  toggleButtonState(inputList, button);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleButtonState(inputList, button);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      if (form.classList.contains("popup__form_profile")) {
        handleProfileFormSubmit();
      }

      if (form.classList.contains("popup__form_card")) {
        handleCardFormSubmit();
      }
    });

    setEventListeners(form);
  });
};

enableValidation();
