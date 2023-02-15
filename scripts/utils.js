import { closePopupByPressEsc } from "./index.js";

//Открытие и закрытие оверлея c попапами//
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByPressEsc);
};

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByPressEsc);
};
