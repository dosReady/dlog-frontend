import { api } from 'api/Core';
import { PostModel, Tag } from 'api/model/PostModels';
class PostService {

    public async getPostList(): Promise<[PostModel[], Tag[]]> {
        let postList: PostModel[] = [];
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

    public async savePost(param:PostModel): Promise<void> {
        await api.post("/mng/post", {post: param});
    }

    public async getPost(postID:string):Promise<PostModel> {
        const param: PostModel = {
            PostID: postID
        }

        const {data} = await api.post<{post: PostModel}>("get/post", {post: param})
        
        return data.post;
    }


}

export default new PostService();