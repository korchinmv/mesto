"use strict";

export class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  _getAvatar(dataForm) {
    this._avatar.src = dataForm.avatar;
  }

  getUserInfo() {
    const userInfo = {
      username: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    };

    return userInfo;
  }

  setUserInfo(dataForm) {
    this._name.textContent = dataForm.name;
    this._job.textContent = dataForm.about;
    this._getAvatar(dataForm);
  }

  changeAvatar(dataForm) {
    this._getAvatar(dataForm);
  }
}
