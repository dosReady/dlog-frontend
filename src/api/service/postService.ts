import api from 'api/core';
import Axios from 'axios';
import { Post, Tag } from 'api/model/postModels';
import {AxiosResponse} from 'axios';

class PostService {

    public async getPostList(): Promise<[Post[], Tag[]]> {
        const response = await Axios.all([api.post("/get/postlist"), api.post("/get/taglist")])
        const postList: Post[] = response[0].data.list;
        const tagList: Tag[] = response[1].data.list;
        return [postList, tagList];
    }


}

export default new PostService();