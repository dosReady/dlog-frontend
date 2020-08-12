export interface Post {
	PostID?: string,
    MainTitle?: string, 
    SubTitle?: string,
    Content?: string,
    TagsJSON?: string,
    CreatedAt?: Date,
    UpdatedAt?: Date
}

export interface PostModel {
	PostKey:      string, 
	PostTitle:    string,
	PostSubTitle: string, 
	PostContent:  string, 
    CreatedAt:    string,
    UpdatedAt:    string
}


export interface Tag {
    TagMstID: string,
    TagName: string,
    CreatedAt?: Date,
    UpdatedAt?: Date
}