import {api} from 'api/core';
import { Post, Tag } from 'api/model/postModels';

class PostService {

    public async getPostList(): Promise<[Post[], Tag[]]> {
        let postList: Post[] = [];
        let tagList: Tag[] = [];
        
        try {
            const rServer1 = await api.post("/get/postlist");
            const rServer2= await api.post("/get/taglist");
            postList = rServer1.data.list;
            tagList = rServer2.data.list;

            
        } catch (error) {
            console.log(error);
        }

       
        return [postList, tagList];
    }

    public async savePost(param:Post): Promise<void> {
        await api.post("/mng/post", {post: param});
    }


}

export default new PostService();