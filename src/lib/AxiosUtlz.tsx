import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import LoginSrvc from "org/dlog/comn/LoginSrvc";
import { User } from "@types";

// enum HttpStatusCode {
//     UNAUTHORIZED = 401,
//     FORBIDDEN = 403
// }

enum AuthChek {
    ACCESS = "access",
    REFRESH = "refresh"
}

const config:AxiosRequestConfig = {
    baseURL: "http://101.101.216.250:8080",
    //baseURL: "http://127.0.0.1:8080",
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
        const {data}:AxiosResponse<{user:User}> = await admin.post('vaild/refresh', {"user": user});
        LoginSrvc.setLocalStorage(data.user);
        res.config.headers.Authorization = `Bearer ${data.user.AccessToken}`;
        return sec(res.config);
    } else if(data.errormsg === AuthChek.REFRESH) {
        alert("로그인 하시기 바랍니다.");
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

