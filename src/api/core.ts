import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import UserService from './service/UserService';
import { toast } from 'react-toastify';

export const api =  axios.create(
    {
        baseURL: "http://127.0.0.1:8080",
        headers: {
            "content-type": "application/json"
        },
        responseType: "json"
    }
)

export const post = async function(url:string, param:any) {
    await api.post(url, param)
}

const reqSuccessCallback = async function(req:AxiosRequestConfig):Promise<AxiosRequestConfig> {
    console.log("req");
    return req;
}

const resSuccessCallback = async function(res:AxiosResponse):Promise<AxiosResponse> {
    const data:{errormsg:string} = res.data;
    if(data.errormsg === "access") {
        const isOk = await UserService.procSettingLogin();
        if(isOk) {
            window.location.replace("/");
            return api(res.config);
        } else {
            return res;
        }
        
    } else if(data.errormsg === "refresh") {
        toast.error("로그인정보가 만료되었습니다.");
        window.location.replace("/");
    }

    return res;
}

api.interceptors.request.use(reqSuccessCallback);
api.interceptors.response.use(resSuccessCallback);
