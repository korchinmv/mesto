"use strict";

const formElements = {
  formProfile: "popup__form_profile",
  formCard: "popup__form_card",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

const showInputError = (
  form,
  input,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
};

const hideInputError = (form, input, inputErrorClass, errorClass) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = "";
};

const checkInputValidity = (form, input, { inputErrorClass, errorClass }) => {
  if (!input.validity.valid) {
    showInputError(
      form,
      input,
      input.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(form, input, inputErrorClass, errorClass);
  }
};

const invalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, button, { inactiveButtonClass }) => {
  if (invalidInput(inputList)) {
    button.classList.add(`${inactiveButtonClass}`);
    button.disabled = true;
  } else {
    button.classList.remove(`${inactiveButtonClass}`);
    button.disabled = false;
  }
};

const setEventListeners = (
  form,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const inputList = Array.from(form.querySelectorAll(`${inputSelector}`));
  const button = form.querySelector(`${submitButtonSelector}`);

  toggleButtonState(inputList, button, rest);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, rest);
      toggleButtonState(inputList, button, rest);
    });
  });
};

const enableValidation = ({ formSelector, formProfile, formCard, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(`${formSelector}`));

  formList.forEach((form) => {
    setEventListeners(form, rest);
  });
};

enableValidation(formElements);