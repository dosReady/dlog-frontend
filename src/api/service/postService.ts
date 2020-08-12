import { api } from 'api/Core';
import { PostModel } from 'api/model/PostModels';
class PostService {

    public async getPostList(): Promise<PostModel[]> {
        let postList: PostModel[] = [];
        try {
            const res = await api.post("/get/postlist");
            postList = res.data.list;
        } catch (error) {
            console.log(error);
        }
        return postList;
    }

    public async addPost(param:PostModel): Promise<void> {
        await api.post("/add/post", {...param});
    }

    public async getPost(postkey:string):Promise<PostModel> {
        const param = {
            PostKey: postkey
        }

        const {data} = await api.post<{post: PostModel}>("get/post", {post: param})
        
        return data.post;
    }


}

export default new PostService();