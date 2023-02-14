"use strict";

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

export const disabledButton = ({
  formSelector,
  submitButtonSelector,
  inactiveButtonClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    const button = form.querySelector(submitButtonSelector);
    addDisabledButton(button, inactiveButtonClass);
  });
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

const addDisabledButton = (button, inactiveButtonClass) => {
  button.classList.add(`${inactiveButtonClass}`);
  button.disabled = true;
};

const removeDisabledButton = (button, inactiveButtonClass) => {
  button.classList.remove(`${inactiveButtonClass}`);
  button.disabled = false;
};

const toggleButtonState = (inputList, button, { inactiveButtonClass }) => {
  if (invalidInput(inputList)) {
    addDisabledButton(button, inactiveButtonClass);
  } else {
    removeDisabledButton(button, inactiveButtonClass);
  }
};

const setEventListeners = (
  form,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
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
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    setEventListeners(form, rest);
    disabledButton(formElements);
  });
};

// enableValidation(formElements);
