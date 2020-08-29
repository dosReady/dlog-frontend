export interface IPostModel {
	PostKey:      string, 
	PostTitle:    string,
    PostContent:  string, 
    Tags:         string[],   
    CreatedAt:    string,
    UpdatedAt:    string
}

export interface IPostListModel {
	PostKey:      string, 
	PostTitle:    string,
    PostContent:  string, 
    Tags:         string,   
    CreatedAt:    string,
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