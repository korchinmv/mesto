export class UserInfo {
  constructor(nameUser, aboutUser) {
    this._name = nameUser;
    this._aboutUser = aboutUser;
  }

  getUserInfo() {
    let userInfo = {};

    userInfo.nameUser = this._name.textContent;
    userInfo.aboutUser = this._aboutUser.textContent;
    return userInfo;
  }

  setUserInfo() {}
}
