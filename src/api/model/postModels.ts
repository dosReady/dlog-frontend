export interface IPostModel {
	PostKey:      string, 
	PostTitle:    string,
	PostSubTitle: string, 
    PostContent:  string, 
    PostCategory: string, 
    Tags:         ITagModel[],   
    CreatedAt:    string,
    UpdatedAt:    string
}

export interface ITagModel {
    TagKey:  string,
    TagName: string,
    IsDel:   string
}

export interface IPostStore {
    postkey?:string,
    category?:string,
}