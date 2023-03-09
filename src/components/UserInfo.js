"use strict";

export class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      username: this._name.textContent,
      job: this._job.textContent,
    };

    return userInfo;
  }

  setUserInfo(dataForm) {
    this._name.textContent = dataForm.name;
    this._job.textContent = dataForm.about;
    this._avatar.src = dataForm.avatar;
  }
}
