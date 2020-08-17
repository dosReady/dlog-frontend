import { observable, action, computed } from "mobx";


export interface StoreType {
    isLogin: boolean,
    setIsLogin: (value:boolean) => void
}

class RootStore {
    @observable private _isLogin: boolean = false;

    @action setIsLogin(value:boolean): void {
      this._isLogin = value;
    }
    @computed get isLogin():boolean {
      return this._isLogin;
    }
}

export default RootStore;