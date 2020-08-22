import { StringUtlz } from "lib/Utlz";
import { action, computed, observable } from "mobx";

export interface StoreType {
    isLogin: boolean,
    setIsLogin: (value:boolean) => void
}

export class LoginStore {
  @observable private _isLogin: boolean = false;

  @action setIsLogin(value:boolean): void {
    this._isLogin = value;
  }
  @computed get isLogin():boolean {
    return this._isLogin;
  }
}


type PostStoreType  = {
  postkey?:string,
  category?:string,
}

export class PostStore {
    private _KEY: string = "POST_STORE";

    @observable private _postkey: string = "";
    @observable private _category: string = "";

    @action 
    public setPostkey(value:string):void {
      const data:PostStoreType = {
        ...this.postdata,
        postkey: value
      }

      window.localStorage.setItem(this._KEY, JSON.stringify(data));
      this._postkey = value;
    }

    @computed 
    public get postkey():string {
      const data: PostStoreType = this.postdata;
      if(data.postkey !== undefined) {
        this._postkey = data.postkey;
      }

      return this._postkey;
    }

    @action 
    public setCategory(value:string):void {
      const data:PostStoreType = {
        ...this.postdata,
        category: value
      }
      console.log(data)
      window.localStorage.setItem(this._KEY, JSON.stringify(data));
      this._category = value;
    }

    @computed 
    public get category():string {
      const data: PostStoreType = this.postdata;
      if(data.category !== undefined) {
        this._category = data.category;
      }

      return this._category;
    }

    private get postdata(): PostStoreType {
      let data = {} as PostStoreType;
      try {
        const value = window.localStorage.getItem(this._KEY);
        if(!StringUtlz.isEmpty(value)) {
          const storedata = JSON.parse(value || '');
          data = storedata;
        }
      } catch (e) {}
    
      return data;
    }
}

class RootStore {
  poststore:PostStore;
  loginstore:LoginStore;

  constructor() {
    this.poststore = new PostStore();
    this.loginstore = new LoginStore();
  }
}

export const store =  new RootStore();