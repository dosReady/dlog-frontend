import { User } from "@types";
import { sec } from "lib";

const STORENAME = 'appstore'

class LoginSrvc {
    
    public setLocalStorage(param:User):void {
        if(param !== null) {
            window.localStorage.setItem(STORENAME, JSON.stringify(param))
            sec.defaults.headers.common = { 'Authorization': `Bearer ${param.AccessToken}` };
        }
    }

    public getLocalStorage():User| null {
        const storage:string | null= window.localStorage.getItem(STORENAME);
        if(storage != null && storage !== "undefined") return JSON.parse(storage);
        else return null;
    }

    public isEmpty(): boolean {
        const appstore = window.localStorage.getItem(STORENAME);
        if(appstore !== null) return false;
        return true;
    }

    public removeLocalStorage():void {
        window.localStorage.removeItem(STORENAME);
    }
}

 export default  new LoginSrvc();