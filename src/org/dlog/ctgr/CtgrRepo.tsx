import { TbCategory } from "modules/Types";
import { AxiosResponse } from "axios";
import { observable, computed, action } from "mobx";
import { sec } from "lib";


class CtgrRepo {
    @observable private list:TbCategory[] = [];

    @action
    public async srchList():Promise<void>{
        const res:AxiosResponse<{list:TbCategory[]}>  = await sec.post("get/categorylist");
        if(res !== null) this.list = res.data.list;
    }

    @computed
    public get getList():TbCategory[] {
        return this.list;
    }
}

export default new CtgrRepo();