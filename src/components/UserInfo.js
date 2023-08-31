export class UserInfo {
  constructor({userName, userJob, userAvatar, userId}) {
    this._userName = userName;
    this._userJob = userJob;
    this._userAvatar = userAvatar;
this._userId = userId;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    };
  }

  setUserInfo(info) {
    this._userName.textContent = info.name;
    this._userJob.textContent = info.about;
  }

setUserAvatar(info) {
  this._userAvatar.src = info.avatar;
}
  
}



