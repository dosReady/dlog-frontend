export interface PostModel {
	PostKey:      string, 
	PostTitle:    string,
	PostSubTitle: string, 
    PostContent:  string, 
    PostCategory: string,    
    CreatedAt:    string,
    UpdatedAt:    string
}

export interface Tag {
    TagMstID: string,
    TagName: string,
    CreatedAt?: Date,
    UpdatedAt?: Date
}