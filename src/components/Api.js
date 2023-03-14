export class Api {
  constructor(URL, TOKEN) {
    this._URL = URL;
    this._TOKEN = TOKEN;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      authorization: this._TOKEN,
    };
  }

  _getJson(res) {
    {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} что то идет не по плану`);
    }
  }

  getUser() {
    const promise = fetch(`${this._URL}users/me`, {
      headers: this._getHeaders(),
    });
    return promise.then(this._getJson);
  }

  getCards() {
    const promise = fetch(`${this._URL}cards`, {
      headers: this._getHeaders(),
    });
    return promise.then(this._getJson);
  }

  sendProfile(data) {
    const promise = fetch(`${this._URL}users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    });

    return promise.then(this._getJson);
  }

  sendCard(data) {
    const promise = fetch(`${this._URL}cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return promise.then(this._getJson);
  }

  deleteCard(id) {
    const promise = fetch(`${this._URL}cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
    return promise.then(this._getJson);
  }

  addLike(id) {
    const promise = fetch(`${this._URL}cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    });
    return promise.then(this._getJson);
  }

  deleteLike(id) {
    const promise = fetch(`${this._URL}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
    return promise.then(this._getJson);
  }

  setAvatar(avatar) {
    const promise = fetch(`${this._URL}users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatar.link,
      }),
    });
    return promise.then(this._getJson);
  }
}
