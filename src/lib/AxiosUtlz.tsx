import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import LoginSrvc from "org/dlog/comn/LoginSrvc";
import { User } from "@types";

enum HttpStatusCode {
    UNAUTHORIZED = 401,
    FORBIDDEN = 403
}

const config:AxiosRequestConfig = {
    baseURL: "http://192.168.0.4:8080",
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
    
    return res;
}
const resErrorCallback = async function(error:AxiosError):Promise<any> {
    console.log("resErrorCallback")
    console.log(error.response?.config)
    const httpcode: number = error.response!.status;
    if(httpcode === HttpStatusCode.UNAUTHORIZED) {

        const user = LoginSrvc.getLocalStorage();
        try {
            const {data}:AxiosResponse<{user:User}> = await admin.post('vaild/refresh', {"user": user});
            LoginSrvc.setLocalStorage(data.user)

            return sec(error.config)
        } catch (e) {
            const axioserr:AxiosError = e;
            if(axioserr.isAxiosError && axioserr.response?.status === HttpStatusCode.FORBIDDEN) {
                alert("로그인 하시기 바랍니다.");
                window.location.replace("/login");
            }
           
        }
      
    }

    return Promise.reject(error);
}
sec.interceptors.request.use(reqSuccessCallback, reqErrorCallback);

sec.interceptors.response.use(resSuccessCallback, resErrorCallback);

