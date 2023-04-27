export default interface BasicForm{
    // basId?:string;
    name?: string;
    company?: string;
    position?: string;
    department?: string;
    contacts:Contacts
}

export interface Contacts{
    contactFields:string;
    contactValue:string
}