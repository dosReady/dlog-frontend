export class StringUtlz  {

    public static isEmpty(value:any): boolean {
        
        if( value === "" 
        ||  value === null 
        ||  value === undefined 
        || ( value !== null && typeof value === "object" && Object.keys(value).length > 0 ) ){
            return true ;
        }

        return false;
    }

}