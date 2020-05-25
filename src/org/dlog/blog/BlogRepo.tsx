import { sec } from "lib";
import { AxiosResponse } from "axios";
import { BlogOutDTO, Post } from "@types";
import { observable, action, computed } from "mobx";

class BlogRepo {
    @observable private list: BlogOutDTO[] = [];

    @action
    public async srchList(param?: Post):Promise<void> {
       const {data}: AxiosResponse<{list: BlogOutDTO[]}> = await sec.post("api/get/postlist", {"info": param});
       this.list = data.list;
    }

    public async srchPost(param: Post):Promise<Post> {
        const {data}:AxiosResponse<{info:Post}> = await sec.post("api/get/post", {"info": param});
        return data.info;
    }

    @computed
    public get getList():BlogOutDTO[]{
        return this.list;
    }

}

export default new BlogRepo();