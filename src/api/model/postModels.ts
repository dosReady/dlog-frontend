export interface Post {
	PostID?: string,
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