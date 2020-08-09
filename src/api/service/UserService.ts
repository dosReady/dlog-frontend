import { api } from 'api/Core';
import { LoginStrgeInfo, UserLoginInfo } from 'api/model/UserModels';
import { AxiosResponse } from 'axios';
import { StringUtlz } from 'lib/Utlz';
import { toast } from 'react-toastify';
class UserService {

    public async reqLogin(loginInfo:UserLoginInfo): Promise<LoginStrgeInfo> {
        let userInfo = {} as LoginStrgeInfo;

        try {   
            const {data} = await api.post("/proc/login", {"user": loginInfo});
            userInfo = data.user;
        } catch(error){
            console.log(error);
        }
        
        return userInfo;
    }

    public setUserLocalstorage(loginInfo:LoginStrgeInfo): void {
        window.localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    }

    public getUserLocalstorage(): LoginStrgeInfo {
        const strJson = window.localStorage.getItem("loginInfo"); 
        let loginInfo = {} as LoginStrgeInfo;
        if(!StringUtlz.isEmpty(strJson)) {
            loginInfo = JSON.parse(strJson || '');
        }
        return loginInfo;
    }


    public async vldtRefreshToken(): Promise<string> {
        const loginInfo = this.getUserLocalstorage();
        const chkRes: AxiosResponse<{ token: { AccessToken: string, RefreshToken: string } }> 
                        = await api.post('vaild/refresh', { "LoginID": loginInfo.LoginID, "RefreshToken": loginInfo.RefreshToken });
        if(!StringUtlz.isEmpty(chkRes.data.token.AccessToken)) {
            return chkRes.data.token.AccessToken;
        }
        return "";
    }

    public async procSettingLogin(): Promise<boolean> {
        const sAccessToken = await this.vldtRefreshToken();
        if(!StringUtlz.isEmpty(sAccessToken)) {
            api.defaults.headers.Authorization = `Bearer ${sAccessToken}`;
            return true;
        } else {
            toast.error("로그인 정보가 없습니다.");
            api.defaults.headers.Authorization = "";
            return false;
        }
    }

}

export default new UserService();