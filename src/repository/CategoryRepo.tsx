import axios,{AxiosResponse} from 'axios';
import { TbCategory } from 'modules/Types';

class CategoryRepo {
    private _url = "ttp://127.0.0.1:8080/api/get/categorylist";

    public async getAll():Promise<TbCategory[]> {
        let rtn:TbCategory[] = [];

        try {
            const {data}:AxiosResponse<{list:TbCategory[]}> = await axios.post(`http://127.0.0.1:8080/api/get/categorylist`);
            rtn = data.list;
        } catch (error) {
            console.error("조회되지 않았습니다.");
        }

        return rtn;
    }
}

export default new CategoryRepo();
