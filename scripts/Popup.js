"use strict";

import { profileEditButton, popupCloseButton } from "./variables.js";

export class Popup {
  constructor(popup) {
    this._popupSelector = popup;
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    console.log("hihi");
  }

  setEventListeners() {
    profileEditButton.addEventListener("click", () => {
      this.open();
    });

    popupCloseButton.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    document.addEventListener("click", (evt) => {
      const targetElement = evt.target;

      if (targetElement.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}
