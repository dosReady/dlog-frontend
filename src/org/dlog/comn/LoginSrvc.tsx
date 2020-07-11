import { User } from "@types";
import { sec } from "lib";
import LoginRepo from "./LoginRepo";

const STORENAME = 'appstore'

class LoginSrvc {
    
    public async login(param:User): Promise<void> {
        const user = await LoginRepo.login(param);
        this.setLocalStorage(user);
        window.location.replace("/blog");
    }

    public async logout(param:User): Promise<void> {
        await LoginRepo.logout(param);
        this.removeLocalStorage();
        window.location.replace("/login");
    }

    public setLocalStorage(param:User):void {
        if(param !== null && param !== undefined) {
            window.localStorage.setItem(STORENAME, JSON.stringify(param))
            sec.defaults.headers.Authorization = `Bearer ${param.AccessToken}`;
        }
    }

    public getLocalStorage():User| null {
        const storage:string | null= window.localStorage.getItem(STORENAME);
        if(storage != null && storage !== "undefined") return JSON.parse(storage);
        else return null;
    }

    public isEmpty(): boolean {
        const appstore = window.localStorage.getItem(STORENAME);
        if(appstore != null && appstore !== "undefined") return false;
        return true;
    }

    public removeLocalStorage():void {
        sec.defaults.headers.Authorization = "";
        window.localStorage.removeItem(STORENAME);
    }
}

 export default  new LoginSrvc();