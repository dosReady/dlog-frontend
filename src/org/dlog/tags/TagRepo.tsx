import { sec } from "lib";
import { AxiosResponse } from "axios";
import { Tag } from "@types";
import { observable, action, computed } from "mobx";

class TagRepo {
    @observable private list: Tag[] = [];

    @action
    public async srchList(param?: Tag):Promise<void> {
       const {data}: AxiosResponse<{list: Tag[]}> = await sec.post("api/get/taglist", {"info": param});
       this.list = data.list;
    }


    @computed
    public get getList():Tag[]{
        return this.list;
    }

}

export default new TagRepo();