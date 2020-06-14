import {observable, action, computed} from 'mobx';
import RootStore from 'modules/stores';
import {persist} from 'mobx-persist';
import { User } from '@types';

class AppStore {
    public root:RootStore;

    @persist @observable 
    private _user:User;

    @persist @observable 
    private _color:string = "#F1F2F4";

    constructor(root:RootStore) {
        this.root = root;
        this._user = {LoginID: '', Password: '', Role: ''};
    }

    @action
    public setLoginID(loginID:string) {
        this._user.LoginID = loginID;
    }

    @computed
    public get getLoginID(): string {
        return this._user.LoginID;
    }

    @action
    public setPwd(password:string) {
        this._user.Password = password;
    }

    @action
    public getPwd(): string {
        return this._user.Password;
    }

    @action
    public getUser():User {
        return this._user;
    }

    @action
    public setColor(color:string):void{
        this._color = color;
    }

    @action
    public getColor():string{
        return this._color;
    }
}

export default AppStore;