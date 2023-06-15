export class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(array, id) {
    array.forEach((item) => {
      this._renderer(item, id);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
