import { observable, action, computed } from "mobx";
import { ITagStore, ITagModel } from "api/model/TagModels";
import { StringUtlz } from "lib/Utlz";
import { api } from "api/Core";

class TagService {
    private KEY:string = "TAG_STORE";
    /*
    ====== MOBX =======
    */
    @observable private _tagkey: string = "";

    @action
    public setTagKey(value: string): void {
        const data: ITagStore = {
            ...this._tagdata,
            tagkey: value
        }

        window.localStorage.setItem(this.KEY, JSON.stringify(data));
        this._tagkey = value;
    }

    @computed
    public get tagkey(): string {
        const data: ITagStore = this._tagdata;
        if(!StringUtlz.isEmpty(data.tagkey)) {
            this._tagkey = data.tagkey || '';
        }
        return  this._tagkey;
    }
    
    private get _tagdata(): ITagStore {
        let data = {} as ITagStore;
        try {
            const value = window.localStorage.getItem(this.KEY);
            if(!StringUtlz.isEmpty(value)) {
                const storedata = JSON.parse(value || '');
                data = storedata;
            }
        } catch(e) {}
        
        return data;
    }

    /*
    ====== API =======
    */
    public async getTagList(): Promise<ITagModel[] | null> {
        let taglist: ITagModel[] | null = null;
        try {
            const res = await api.post("/get/taglist");
            taglist = res.data.list;
        } catch (error) {}

        return taglist;
    }
}

export default TagService;