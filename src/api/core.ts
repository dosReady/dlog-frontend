import axios from 'axios';
import PostService from 'api/service/PostService';
import UserService from 'api/service/UserService';
import TagService from 'api/service/TagService';

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

class RootStore {
    postservice:PostService;
    userservice:UserService;
    tagservice:TagService;
    constructor() {
      this.postservice = new PostService();
      this.userservice = new UserService();
      this.tagservice = new TagService();
    }
}
  
export const store =  new RootStore();