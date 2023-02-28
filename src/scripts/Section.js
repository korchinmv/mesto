"use strict";

export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element) {
    console.log(element);
    this._container.append(element);
  }
}
