import {api} from 'api/core';
import { Article, Tag } from 'api/model/postModels';

class PostService {

    public async getArticleList(): Promise<[Article[], Tag[]]> {
        let postList: Article[] = [];
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

    public async saveArticle(param:Article): Promise<void> {
        await api.post("/mng/post", {post: param});
    }


}

export default new PostService();