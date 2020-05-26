import {User} from "@types"
import { AxiosResponse } from "axios";
import LoginSrvc from "org/dlog/comn/LoginSrvc";
import { sec } from "lib";

interface ApiReponse {
    user:User
}

class LoginRepo{
    public async login(param:User):Promise<void> {
        try {
            const { data }: AxiosResponse<ApiReponse> = await sec.post("proc/login", { "user": param })
            LoginSrvc.setLocalStorage(data.user);
        } catch (error) {
            console.error(error);
        }
    }
}

export default new LoginRepo();
