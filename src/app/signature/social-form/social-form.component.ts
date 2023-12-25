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

  FormData:any;
  socialMediaData:SocialMedia[]=[];

  // Form Controls
  facebookLink = new  FormControl('', [
    Validators.required,
  ])
  twitterLink = new  FormControl('', [
    Validators.required,
  ])
  youtubeLink = new  FormControl('', [
    Validators.required,
  ])
  instagramLink = new  FormControl('', [
    Validators.required,
  ])
  linkedinLink = new  FormControl('', [
    Validators.required,
  ])
  pinterestLink = new  FormControl('', [
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
      facebookLink: this.facebookLink,
      twitterLink: this.twitterLink,
      youtubeLink: this.youtubeLink,
      instagramLink: this.instagramLink,
      linkedinLink: this.linkedinLink,
      pinterestLink: this.pinterestLink,
    });
    this.FormData =this.typeValidationForm.controls
    this.sharedService.socialMediaData$
    .subscribe(socialMediaData => {
      this.socialMediaData = socialMediaData
    });
}

get f() {
  return this.typeValidationForm.controls;
}
  ngOnInit(){
    this.sharedService.setSocialMediaData(this.FormData);
  this.getSocialForm()
}
getBFData:any[]=[]
getSocialForm(){
  var a=this.sharedService.getSignatureData()
  this.sharedService.getSignatureData().subscribe((res: any) => {
    this.getBFData = []
    res.forEach((element:any, x:any) => {
      if(element.payload.doc.data().uid==this.user?.uid)
      this.getBFData.push({
        uid: element.payload.doc.uid,
        ...(element.payload.doc.data() as Record<string, unknown>)
      })
    })
    if(this.getBFData.length>0){
      var getForm:any=this.getBFData[0].socialMedia
    
      this.typeValidationForm.patchValue({
        facebookLink: getForm.facebookLink,
        twitterLink: getForm.twitterLink,
        youtubeLink: getForm.youtubeLink,
        instagramLink: getForm.instagramLink,
        linkedinLink: getForm.linkedinLink,
        pinterestLink: getForm.pinterestLink,
      })
    }
  })

}
}
