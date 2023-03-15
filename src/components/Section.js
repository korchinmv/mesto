"use strict";

export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element) {
    this._container.append(element);
  }

  prependItem(item) {
    this._container.prepend(item);
  }
}
