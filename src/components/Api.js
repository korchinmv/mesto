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

  sendProfile(name, job) {
    const promise = fetch(`${this._URL}users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    });

    return promise.then(this._getJson);
  }
}
