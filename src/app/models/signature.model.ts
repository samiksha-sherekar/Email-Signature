// import { BasicForm } from "./bacisForm.model";

import BasicForm from "./bacisForm.model";
import DesignForm from "./designForm.model";
import { ImageDetails } from "./imageForm.model";
import { SocialMedia } from "./socialForm.model";

export default interface ISignature{
    signID?: string;
    uid?: string;
    basicForm:BasicForm;
    imageForm: ImageDetails;
    socialMedia : SocialMedia;
    designForm : DesignForm
}

export class FormField {
    fieldName?: string;
    fieldType?: string;
    required?: boolean = false;
    validator?: string;
}
// export interface basicForm{
//     basId?:string;
//     name: string;
//     company: string;
//     position: string;
//     department: string;
// }

// export default interface ISignature {
//     id?: string| null;
//     name?: string| null;
//     company?: string| null;
//     position?: string;
//     department?: string;
    
//   }