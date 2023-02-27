import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
    this._form = popup.querySelector(".popup__form");
    this._input = this._form.querySelector(".popup__input");
  }

  _getInputValues() {
    this._input.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this._form);

    this._form.addEventListener("submit", (evt) => {
      evt.perventDefault();
      this._submitForm();
    });
  }
}
