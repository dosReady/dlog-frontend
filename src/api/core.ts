import axios from 'axios';

export default axios.create(
    {
        baseURL: "http://127.0.0.1:8080",
        headers: {
            "content-type": "application/json"
        },
        responseType: "json"
    }
)

// const resSuccessCallback = async function(res:AxiosResponse):Promise<AxiosResponse> {
//     console.log("resSuccessCallback");
//     const data:{errormsg:string} = res.data;

//     if(data.errormsg === AuthChek.ACCESS) {
//         const user = LoginSrvc.getLocalStorage();
//         const chkRes:AxiosResponse<{user:User}> = await admin.post('vaild/refresh', {"user": user});
      
//         if(chkRes.data.user !== undefined) {
//             LoginSrvc.setLocalStorage(chkRes.data.user);
//             res.config.headers.Authorization = `Bearer ${chkRes.data.user.AccessToken}`;
//             return sec(res.config);
//         } else {
//             window.location.replace("login");
//             return res;
//         }
        
//     } else if(data.errormsg === AuthChek.REFRESH) {
//         window.location.replace("login");
//         return res;
//     } else {
//         return res;
//     }
// }

//api.interceptors.request.use(reqSuccessCallback, reqErrorCallback);
//api.interceptors.response.use(resSuccessCallback, resErrorCallback);
