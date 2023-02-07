"use strict";
import { formElements } from "validate.js";

class FormValidator {
  construcor(formElements, form) {
    this._formSelector = form;
    this._inputSelector = formElements.inputSelector;
    this._submitButtonSelector = formElements.submitButtonSelector;
    this._inactiveButtonClass = formElements.inactiveButtonClass;
    this._inputErrorClass = formElements.inputErrorClass;
    this._errorClass = formElements.errorClass;
  }

  _showInputError() {
    const errorElement = this._formSelector.querySelector(
      `.${this._inputSelector.id}-error`
    );

    this._inputSelector.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = this._inputSelector.validationMessage;
    errorElement.classList.add(`${this._errorClass}`);
  }

  _disabledButton() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach(() => {
      const button = this._formSelector.querySelector(
        this._submitButtonSelector
      );
      this._addDisabledButton(button, this._inactiveButtonClass);
    });
  }

  _hideInputError() {
    const errorElement = this._formSelector.querySelector(
      `.${this._inputSelector.id}-error`
    );
    this._inputSelector.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._inputSelector.validationMessage}`);
    errorElement.textContent = "";
  }

  _checkInputValidity() {
    if (!this._inputSelector.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _invalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _addDisabledButton(button) {
    button.classList.add(`${this._inactiveButtonClass}`);
    button.disabled = true;
  }

  _removeDisabledButton(button) {
    button.classList.remove(`${this._inactiveButtonClass}`);
    button.disabled = false;
  }

  _toggleButtonState(inputList, button) {
    if (this._invalidInput(inputList)) {
      this._addDisabledButton(button);
    } else {
      this._removeDisabledButton(button);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    const button = this._formSelector.querySelector(
      `${this._submitButtonSelector}`
    );

    this._toggleButtonState();

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity();
        this._toggleButtonState(inputList, button);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((form) => {
      form = new FormValidator(formElements, form);

      // this._setEventListeners();
      // this._disabledButton(formElements);
    });
  }
}
