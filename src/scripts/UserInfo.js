export default class UserInfo {
  constructor(selectorName, selectorJob) {
    this._elementName = document.querySelector(selectorName);
    this._elementJob = document.querySelector(selectorJob);
  }

  getUserInfo() {
    return (this._profileData = {
      name: this._elementName.textContent,
      job: this._elementJob.textContent,
    });
  }

  setUserInfo(popupName, popupJob) {
    this._elementName.textContent = popupName;
    this._elementJob.textContent = popupJob;
  }
}
