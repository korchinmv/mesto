"use strict";

export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector(".popup__close");
    this._escClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");

    document.removeEventListener("keydown", this._escClose);
  }

  setEventListeners() {
    this._buttonClose.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    this._popup.addEventListener("click", (evt) => {
      const targetElement = evt.target;

      if (targetElement.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}
