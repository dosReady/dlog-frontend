export interface User {
    LoginID: string,
    Password: string,
    Role?: string,
    RefreshToken?: string,
    AccessToken?: string,
}

export interface AppStore {
    setLoginID: (loginID:string) => void,
    getLoginID: () => string,
    setPwd: (password:string) => void,
    getPwd: () => string,
    getUser: () => User,
    getSrchText: () => string,
    setSrchText: (paramStr: string) => void
}

export interface BlogOutDTO {
    post:Post
}

export interface Post {
	PostID: string,
    MainTitle: string, 
    SubTitle: string,
    Content: string,
    TagsJSON?: string,
    CreatedAt?: Date,
    UpdatedAt?: Date
}

export interface Tag {
    TagMstID: string,
    TagName: string,
    CreatedAt?: Date,
    UpdatedAt?: Date
}

export interface PostDTO {
    post: Post,
    tags: Tag[]
}