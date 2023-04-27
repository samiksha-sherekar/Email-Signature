import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialMedia } from 'src/app/models/socialForm.model';
import { SignService } from 'src/app/services/sign.service';
import firebase from 'firebase/compat/app'

@Component({
  selector: 'app-social-form',
  templateUrl: './social-form.component.html',
  styleUrls: ['./social-form.component.css']
})
export class SocialFormComponent implements OnInit {
  user: firebase.User | null = null

  FormData:any[]=[]
  socialMediaData:SocialMedia[]=[];
  iconDetails:any[]=[]
  iconPlaceHolder!:string
  icon = new  FormControl('', [
    Validators.required,
  ])
  link = new  FormControl('', [
    Validators.required,
  ])
  typeValidationForm!: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    public sharedService:SignService,private httpClient: HttpClient,
    private auth: AngularFireAuth,
    ) {
      auth.user.subscribe(user => this.user = user)
    this.typeValidationForm = this.formBuilder.group({
      socialMedia: this.formBuilder.array([this.field()]),
    });
    this.FormData.push(this.typeValidationForm.controls)
    // console.log(this.typeValidationForm.get('socialMedia') as FormArray
    //   )

    this.sharedService.socialMediaData$
    .subscribe(socialMediaData => {
      this.socialMediaData = socialMediaData
    });
}

field(): FormGroup {
  return this.formBuilder.group({
    icon:"fa fa-linkedin",
    link:""
  });
}
get socialMedia(): FormArray {
  return this.typeValidationForm.get('socialMedia') as FormArray;
}
  ngOnInit(){
    this.sharedService.setSocialMediaData(this.FormData);
    this.httpClient.get("/assets/iconsInfo.json").subscribe((iconData:any) => {
        this.iconDetails=iconData
  })
  this.getSocialForm()
}
getBFData:any[]=[]
a:any; b:any
getSocialForm(){
  var a=this.sharedService.getSignatureData()
  // console.log(a)
  this.sharedService.getSignatureData().subscribe((res: any) => {
    this.getBFData = []
    res.forEach((element:any, x:any) => {
      if(element.payload.doc.data().uid==this.user?.uid)
      this.getBFData.push({
        uid: element.payload.doc.uid,
        ...(element.payload.doc.data() as Record<string, unknown>)
      })
    })
    // console.log(this.getBFData[0].socialMedia)
    var getForm:any=this.getBFData[0].socialMedia.socialMediaDetails
    // let getForm=this.getBFData[0].socialMedia;
    if (getForm) {
      getForm.forEach((element:any, i:any) => {
        getForm[i].icon=element.icon;
        getForm[i].link=element.link;
        this.field();
      });
    }
    this.typeValidationForm.patchValue({
      socialMedia: getForm,
    })
    let testformArray = this.typeValidationForm.get('socialMedia') as FormArray;

testformArray.patchValue(getForm);
  })

}
  // Dynamic form
  addField(e:any) {
    let fg = this.field();
    fg.patchValue({
      icon:e.icon,
    })
		this.socialMedia.push(fg);
  }
  
  removeField(i: number) {
    if (confirm('Are you sure you want to delete this element?')) {
      this.socialMedia.removeAt(i);
    }
  }
}
