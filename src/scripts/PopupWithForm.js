import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
    this._form = popup.querySelector(".popup__form");
  }

  _getInputValues() {}

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault(this._form);
      console.log(this._submitForm);
      this.close();
    });
  }
}
