export default interface BasicForm{
    // basId?:string;
    fname?: string;
    lname?: string;
    email? : string;
    mobileNo?: string;
    company?: string;
    position?: string;
    department?: string;
    address? :string;
    contacts:Contacts
}

export interface Contacts{
    contactFields:string;
    contactValue:string
}