import axios from 'axios';

export const api =  axios.create(
    {
        //baseURL: "http://127.0.0.1:8080",
        baseURL: "https://api.dveloper.me/",
        headers: {
            "content-type": "application/json"
        },
        responseType: "json"
    }
)
