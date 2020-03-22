
export interface PostInfo {
    mainTitle?:string,
    alisTxt?: string,
    html?:string
}

export interface TbPost {
    Content?:string,
    MainTitle?:string
    PostID?:number,
    SubTitle?:string,
    TagID?:number,
    CreatedAt?:Date,
    UpdatedAt?:Date
}

export interface TbTag {
	TagID:number,
	TagTitle:string,
	TagAlias:string
}
