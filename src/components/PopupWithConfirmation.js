import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmButton = this._popup.querySelector(".popup__save");
  }

  handleConfirmation(removeApi) {
    this._removeCardApi = removeApi;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._removeCardApi();
    });
  }
}
