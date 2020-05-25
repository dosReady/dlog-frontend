import { BlogOutDTO, Post } from "@types";
import BlogRepo from "./BlogRepo";

class BlogSrvc {
    public async srchList(param?:Post):Promise<BlogOutDTO[]> {
        await BlogRepo.srchList(param);
        return BlogRepo.getList;
    }
}

 export default new BlogSrvc();