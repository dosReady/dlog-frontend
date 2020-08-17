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
        let post: PostModel = {} as PostModel;
        try {
            const {data} = await api.post("get/post", {"postkey": postkey});
            post = data.post;
        } catch (error) {
            console.log(error);
        }
        return post;
    }


}

export default new PostService();