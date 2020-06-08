import { Post } from "@types";
import BlogRepo from "./BlogRepo";

class BlogSrvc {
    public async srchList(param?:Post):Promise<Post[]> {
        await BlogRepo.srchList(param);
        const list = BlogRepo.getList;
        return list;
    }
}

 export default new BlogSrvc();