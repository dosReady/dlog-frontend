import { sec } from "lib";
import { AxiosResponse } from "axios";
import { Post, PostDTO } from "@types";
import { observable, action, computed } from "mobx";

class BlogRepo {
    @observable private list: Post[] = [];
    @observable private info: PostDTO = {
        post: {
            PostID: "",
            Content: "",
            SubTitle: "",
            CreatedAt: new Date(),
            MainTitle: "",
            UpdatedAt: new Date()
        },
        tags: []
    }

    @action
    public async srchList(param?: Post):Promise<void> {
       const {data}: AxiosResponse<{list: Post[]}> = await sec.post("api/get/postlist", {"post": param});
       this.list = data.list;
    }

    public async srchPost(postID: string):Promise<PostDTO> {
        const {data}:AxiosResponse<PostDTO> = await sec.post("api/get/post", {"post": {"PostID": postID}});
        this.info = {
            post: data.post,
            tags: data.tags
        }
        return data;
    }

    public async mngPost(param: PostDTO): Promise<void> {
        await sec.post("api/mng/post", {"post": param.post, "tags": param.tags});
    }

    public async delPost(param: PostDTO): Promise<void> {
        await sec.post("api/del/post", {"post": param.post})
    }

    @computed
    public get getList():Post[]{
        return this.list;
    }

    @computed
    public get getInfo():PostDTO {
        return this.info;
    }

}

export default new BlogRepo();