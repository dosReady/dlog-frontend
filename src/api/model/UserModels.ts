export interface UserLoginInfo  {
	LoginID:string,
    Password:string
}

export interface LoginStrgeInfo {
    LoginID:string,
    RefreshToken?:string,
	AccessToken?:string
}