export interface TbPost {
    Content?:string,
    MainTitle?:string
    PostID?:number,
    SubTitle?:string,
    CtgID?:number,
    CreatedAt?:Date,
    UpdatedAt?:Date
}

export interface TbCategory{
	CtgID:    number, 
	CtgTitle: string ,
    CtgAlias: string ,
    CtgCnt:   number,
}
