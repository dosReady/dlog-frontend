import { api } from 'api/Core';
import { IPostModel, IPostStore, IPostListModel } from 'api/model/PostModels';
import { StringUtlz } from 'lib/Utlz';
import { action, computed, observable } from 'mobx';
class PostService {
    /*
    ====== MOBX =======
    */
    private KEY:string = "POST_STORE";

    @observable private _postkey: string = "";
    @observable private _category: string = "";

    @action 
    public setPostkey(value:string):void {
      const data:IPostStore = {
        ...this._postdata,
        postkey: value
      }

      window.localStorage.setItem(this.KEY, JSON.stringify(data));
      this._postkey = value;
    }

    @computed 
    public get postkey():string {
      const data: IPostStore = this._postdata;
      if(!StringUtlz.isEmpty(data.postkey)) {
        this._postkey = data.postkey || '';
      }

      return this._postkey;
    }

    @action 
    public setCategory(value:string):void {
      const data:IPostStore = {
        ...this._postdata,
        category: value
      }
      window.localStorage.setItem(this.KEY, JSON.stringify(data));
      this._category = value;
    }

    @computed 
    public get category():string {
      const data: IPostStore = this._postdata;
      if(data.category !== undefined) {
        this._category = data.category;
      }

      return this._category;
    }

    private get _postdata(): IPostStore {
      let data = {} as IPostStore;
      try {
        const value = window.localStorage.getItem(this.KEY);
        if(!StringUtlz.isEmpty(value)) {
          const storedata = JSON.parse(value || '');
          data = storedata;
        }
      } catch (e) {}
    
      return data;
    }
    /*
    ====== API =======
    */
    public async getPostList(tagkey:string): Promise<IPostListModel[] | null> {
        let postList: IPostListModel[] | null = null;
        try {
            const res = await api.post("/get/postlist", {"tagkey": tagkey});
            postList = res.data.list;
        } catch (error) {}
        return postList;
    }

    public async inputPost(param:IPostModel): Promise<void> {
        await api.post("/input/post", {...param});
    }


    public async addPost(param:IPostModel): Promise<void> {
        await api.post("/add/post", {...param});
    }

    public async removePost(postkey: string): Promise<void> {
        await api.post("/remove/post", {"PostKey": postkey});
    }

    public async getPost(postkey:string):Promise<[IPostModel, string[]]> {
        let post = {} as IPostModel;
        let tag = [] as string[];
        try {
          const {data} = await api.post("get/post", {"postkey": postkey});
          post = data.post;
          if(data.tag !== null && data.tag !== undefined) {
            tag = data.tag;
          }
          
        } catch (error) {}
        return [post, tag];
    }


}

export default PostService;