export default class UserInfo {
  constructor(selectorName, selectorJob, selectorAvatar) {
    this._elementName = document.querySelector(selectorName);
    this._elementJob = document.querySelector(selectorJob);
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return (this._profileData = {
      name: this._elementName.textContent,
      about: this._elementJob.textContent,
    });
  }

  setUserInfo({name, about, avatar}) {
    this._elementName.textContent = name;
    this._elementJob.textContent = about;
    this._avatar.src = avatar;
  }
}
