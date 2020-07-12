import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import LoginSrvc from "org/dlog/comn/LoginSrvc";
import { User } from "@types";
import 'dotenv/config';
const defaultURL: string = process.env.SERVER_MODE ? "https://dveloper.me" : "http://127.0.0.1:8080";


enum AuthChek {
    ACCESS = "access",
    REFRESH = "refresh"
}

const config:AxiosRequestConfig = {
    baseURL: defaultURL,
    headers: {
        "content-type": "application/json"
    },
    responseType: "json"
}

export const sec:AxiosInstance = axios.create(config);
export const admin:AxiosInstance = axios.create(config);

const reqSuccessCallback = async function(config:AxiosRequestConfig):Promise<AxiosRequestConfig> {
    console.log("reqSuccessCallback");
    return config;
}
const reqErrorCallback = async function(error:AxiosError):Promise<any> {
    console.log("reqErrorCallback");
    return Promise.reject(error);
}

const resSuccessCallback = async function(res:AxiosResponse):Promise<AxiosResponse> {
    console.log("resSuccessCallback");
    const data:{errormsg:string} = res.data;

    if(data.errormsg === AuthChek.ACCESS) {
        const user = LoginSrvc.getLocalStorage();
        const chkRes:AxiosResponse<{user:User}> = await admin.post('vaild/refresh', {"user": user});
      
        if(chkRes.data.user !== undefined) {
            LoginSrvc.setLocalStorage(chkRes.data.user);
            res.config.headers.Authorization = `Bearer ${chkRes.data.user.AccessToken}`;
            return sec(res.config);
        } else {
            window.location.replace("/login");
            return res;
        }
        
    } else if(data.errormsg === AuthChek.REFRESH) {
        window.location.replace("/login");
        return res;
    } else {
        return res;
    }
}
const resErrorCallback = async function(error:AxiosError):Promise<any> {
    console.log("resErrorCallback")
    // console.log(error.response?.config)
    // const httpcode: number = error.response!.status;
    // if(httpcode === HttpStatusCode.UNAUTHORIZED) {

   
           
    //     }
      
    // }

    return Promise.reject(error);
}
sec.interceptors.request.use(reqSuccessCallback, reqErrorCallback);

sec.interceptors.response.use(resSuccessCallback, resErrorCallback);

