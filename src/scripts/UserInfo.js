export class UserInfo {
  constructor({userName, userJob}) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    this._userInfoValue = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    };
    return this._userInfoValue;
  }

  setUserInfo(info) {
    this._userName.textContent = info.userName;
    this._userJob.textContent = info.userJob;
  }
}
