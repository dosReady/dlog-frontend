export interface ILoginInfo  {
	LoginID:string,
    Password:string
}

export interface ILoginStore {
    LoginID:string,
	AccessToken?:string
}