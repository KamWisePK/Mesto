export class UserInfo {
  constructor({userName, userJob}) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    };
  }

  setUserInfo(info) {
    this._userName.textContent = info.userName;
    this._userJob.textContent = info.userJob;
  }
}
