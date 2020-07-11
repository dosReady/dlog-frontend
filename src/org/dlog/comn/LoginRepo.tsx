import { User } from "@types";
import { AxiosResponse } from "axios";
import { sec } from "lib";

interface ApiReponse {
    user:User
}

class LoginRepo{
    public async login(param:User):Promise<User> {
        const { data }: AxiosResponse<ApiReponse> = await sec.post("proc/login", { "user": param })
        return data.user;
    }

    public async logout(param:User):Promise<void> {
        await sec.post("proc/logout", { "user": param })
    }
}

export default new LoginRepo();
