"use strict";

import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._popupPhotoName = this._popup.querySelector(".popup__caption");
    this._popupImage = this._popup.querySelector(".popup__image");
  }

  open(cardName, link) {
    this._popupPhotoName.textContent = cardName.textContent;
    this._popupImage.src = link;
    this._popupImage.alt = `Фотография ${cardName.textContent}`;
    super.open();
  }
}
