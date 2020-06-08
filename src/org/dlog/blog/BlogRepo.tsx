import { sec } from "lib";
import { AxiosResponse } from "axios";
import { Post, PostDTO } from "@types";
import { observable, action, computed } from "mobx";

class BlogRepo {
    @observable private list: Post[] = [];

    @action
    public async srchList(param?: Post):Promise<void> {
       const {data}: AxiosResponse<{list: Post[]}> = await sec.post("api/get/postlist", {"info": param});
       this.list = data.list;
    }

    public async srchPost(param: Post):Promise<PostDTO> {
        const {data}:AxiosResponse<PostDTO> = await sec.post("api/get/post", {"post": {"PostID": param.PostID}});
        return data;
    }

    public async mngPost(param: PostDTO): Promise<void> {
        await sec.post("api/mng/post", {"post": param.post, "tags": param.tags});
    }

    @computed
    public get getList():Post[]{
        return this.list;
    }

}

export default new BlogRepo();