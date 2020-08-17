import { observable, action, computed } from "mobx";


export interface StoreType {
    isLogin: boolean,
    setIsLogin: (value:boolean) => void,
    isPublic: boolean,
    setIsPublic: (value:boolean) => void
}

class RootStore {
    @observable private _isLogin: boolean = false;
    @observable private _isPublic: boolean = false;

    @action setIsLogin(value:boolean): void {
      this._isLogin = value;
    }
    @computed get isLogin():boolean {
      return this._isLogin;
    }

    @action setIsPublic(value: boolean): void {
      this._isPublic = value;
    }
    @computed get isPublic():boolean {
      return this._isPublic;
    }
}

export default RootStore;