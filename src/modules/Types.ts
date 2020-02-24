
export interface PostInfo {
    mainTitle?:string,
    alisTxt?: string,
    html?:string
}

export interface TbPost {
    Content:string,
    MainTitle:string
    PostID:Number,
    SubTitle:string,
    TagID:Number,
    CreatedAt:Date,
    UpdatedAt:Date
}

export interface TagInfo {
	TagID:Number,
	TagTitle:string,
	TagAlias:string,
    TagCount:Number
}