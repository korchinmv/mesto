"use strict";

export class Popup {
  constructor(popup) {
    this._popupSelector = popup;
    this._buttonClose = popup.querySelector(".popup__close");
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
  }

  setEventListeners() {
    this._buttonClose.addEventListener("click", () => {
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
