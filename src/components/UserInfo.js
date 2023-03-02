"use strict";

export class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
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
    this._job.textContent = dataForm.job;
  }
}
