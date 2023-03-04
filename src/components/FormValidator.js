"use strict";

export class FormValidator {
  constructor(formElements, form) {
    this._formElements = formElements;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._formElements.inputSelector)
    );
    this._button = this._form.querySelector(
      `${this._formElements.submitButtonSelector}`
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(`${this._formElements.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._formElements.errorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._formElements.inputErrorClass}`);
    errorElement.classList.remove(`${this._formElements.errorClass}`);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _invalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _addDisabledButton() {
    this._button.classList.add(`${this._formElements.inactiveButtonClass}`);
    this._button.disabled = true;
  }

  _removeDisabledButton() {
    this._button.classList.remove(`${this._formElements.inactiveButtonClass}`);
    this._button.disabled = false;
  }

  _toggleButtonState() {
    if (this._invalidInput()) {
      this._addDisabledButton();
    } else {
      this._removeDisabledButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
