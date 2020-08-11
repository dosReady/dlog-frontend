import { api } from 'api/Core';
import { LoginStrgeInfo, UserLoginInfo } from 'api/model/UserModels';
import { AxiosResponse } from 'axios';
import { StringUtlz } from 'lib/Utlz';
import { toast } from 'react-toastify';
class UserService {

    public async reqLogin(loginInfo:UserLoginInfo): Promise<LoginStrgeInfo> {
        let userInfo = {} as LoginStrgeInfo;

        try {   
            const {data} = await api.post("/user/login", {"user": loginInfo});
            userInfo = data.user;
        } catch(error){
            console.log(error);
        }
        
        return userInfo;
    }

    public async reqLogout(): Promise<void> {
        try {
            const loginInfo = this.getUserLocalstorage();
            await api.post("/user/logout", {"user": loginInfo});
            this.removeLocalstorage();
            api.defaults.headers.Authorization = " ";
            window.location.replace("/");
        } catch(error) {
            console.log(error);
        }
    }

    public setUserLocalstorage(loginInfo:LoginStrgeInfo): void {
        window.localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    }

    public removeLocalstorage(): void {
        window.localStorage.removeItem("loginInfo");
    }

    public getUserLocalstorage(): LoginStrgeInfo {
        const strJson = window.localStorage.getItem("loginInfo"); 
        let loginInfo = {} as LoginStrgeInfo;
        if(!StringUtlz.isEmpty(strJson)) {
            loginInfo = JSON.parse(strJson || '');
        }
        return loginInfo;
    }

    public procSettingLogin(): boolean {
        const userInfo = this.getUserLocalstorage();
        if(!StringUtlz.isEmpty(userInfo.AccessToken)) {
            api.defaults.headers.Authorization = `Bearer ${userInfo.AccessToken}`;
            return true;
        } else {
            toast.error("로그인 하시기 바랍니다.");
            api.defaults.headers.Authorization = "";
            return false;
        }
    }

}

export default new UserService();