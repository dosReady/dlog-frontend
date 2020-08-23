import { api } from 'api/Core';
import { ILoginInfo, ILoginStore } from 'api/model/UserModels';
import { StringUtlz } from 'lib/Utlz';
import { action, computed, observable } from 'mobx';
import { RouteComponentProps } from 'react-router-dom';

class UserService {
    /*
    ====== MOBX =======
    */

    private KEY: string = "USER_STORE";
    
    @observable
    private _userdata:ILoginStore = {} as ILoginStore;

    private _setHeader(value:string):void {
        if(!StringUtlz.isEmpty(value)) {
          api.defaults.headers.Authorization = `Bearer ${value}`;
        } else {
          api.defaults.headers.Authorization = "";
        }
    } 

    @action
    public setUserdata(value:ILoginStore): void {
        this._userdata = value;
        this._setHeader(value.AccessToken || '');
        window.localStorage.setItem(this.KEY, JSON.stringify(value));
    }

    @computed
    public get userdata():ILoginStore {
        let data = this._userdata;
        try {
          const value = window.localStorage.getItem(this.KEY);
          if(StringUtlz.isEmpty(data.AccessToken) && !StringUtlz.isEmpty(value)) {
            const storedata = JSON.parse(value || '');
            data = storedata;
            this._setHeader(data.AccessToken || '');
          }
        } catch (e) {}
      
        return data;
    }

    @action
    public removeUserdata():void {
        window.localStorage.removeItem(this.KEY);
        this.setUserdata({} as ILoginStore);
    }

    @computed
    public get isLogin():boolean {
      if(StringUtlz.isEmpty(this.userdata.AccessToken)) return false;
      return true;
    }
    /*
    ====== API =======
    */
    public async reqLogin(loginInfo:ILoginInfo, props:RouteComponentProps): Promise<void> {
        const {data} = await api.post("/user/login", {"user": loginInfo});
        this.setUserdata(data.user);
        props.history.replace("/");
    }

    public async reqLogout(): Promise<void> {
        try {
            const data = this._userdata;
            await api.post("/user/logout", {"user": data});
            // 로그아웃처리후 웹앱이 재 렌더링처리를 위해 window location을 사용
            await window.location.replace("/dlog");
            await this.removeUserdata();
        } catch(error) {}
    }
}

export default UserService;