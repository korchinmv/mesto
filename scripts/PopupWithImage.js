"use strict";

import { Popup } from "./Popup.js";
import { popupPhotoName, popupImage, popupPhoto } from "./variables.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(card) {
    popupPhotoName.textContent = card.alt.slice(11);
    popupImage.src = card.src;
    popupImage.alt = card.alt;
    super.open();
    console.log(card);
  }
}
