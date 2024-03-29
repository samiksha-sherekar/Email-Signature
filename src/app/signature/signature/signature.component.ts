import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SignService } from 'src/app/services/sign.service';
import firebase from 'firebase/compat/app'
import { Router } from '@angular/router';
import { ImageDetails } from 'src/app/models/imageForm.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit {
  sharedData:any
  // imageData:any[]=[]
  socialMediaData:any;
  designData:any
  user: firebase.User | null = null;
  data:any
  showSuccess = false;
  showSuccessMessage = '';
  alertColor = 'primary';

  constructor(
      public sharedService:SignService,
      private auth: AngularFireAuth,
      private _router: Router,private sanitizer: DomSanitizer
    ) {
    auth.user.subscribe(user => this.user = user)
  }

  ngOnInit() {
    this.getBasicData();
    // this.getImageData();
    this.getSocialMediaData();
    this.getDesignData()
  }
  // Basic Form
getBasicData(){
  this.sharedService.basicData$
      .subscribe((basicData:any) => {
      if(basicData)
      { this.sharedData=basicData;}
      });
}
// Image Data Get
// getImageData(){
//   this.sharedService.imageData$
//       .subscribe(imageData => {
//         if(imageData){
//           this.imageData=imageData;
//         }
//       });
// }
// Social Media Get
getSocialMediaData(){
  this.sharedService.socialMediaData$
      .subscribe(socialMediaData => {
        if(socialMediaData){
          this.socialMediaData = socialMediaData;
        }
      });
}
// Design Data Get
getDesignData(){
  this.sharedService.designData$
      .subscribe(designData => {
        if(designData){
          this.designData = designData
        }
      });
}

async onSubmit(){
  if(this.user?.uid){
    this.data={
      uid: this.user?.uid as string,
      basicForm : {  
        fname:this.sharedData.fname.value,
        lname:this.sharedData.lname.value,
        email:this.sharedData.email.value,
        mobileNo:this.sharedData.mobileNo.value,
        company:this.sharedData.company.value,
        position:this.sharedData.position.value,
        department:this.sharedData.department.value,
        address:this.sharedData.address.value,
      },
      // imageForm : {
      //   profileImage : this.imageData[0].profileImage.value
      // },
      socialMedia : {
        facebookLink:this.socialMediaData.facebookLink.value,
        twitterLink: this.socialMediaData.twitterLink.value,
        youtubeLink:this.socialMediaData.youtubeLink.value,
        instagramLink: this.socialMediaData.instagramLink.value,
        linkedinLink:this.socialMediaData.linkedinLink.value,
        pinterestLink: this.socialMediaData.pinterestLink.value,
      },
      designForm : {
        fontFamily:this.designData.fontFamily.value,
        fontSize:this.designData.fontSize.value,
        templateColor:this.designData.templateColor.value,
        backgroundColor:this.designData.backgroundColor.value,
      }
    }
      try {
        await this.sharedService.createSign(this.data)
        this.showSuccessMessage = "Success! New signature has been saved."
        this.showSuccess = true
        this.alertColor = "success"
        setTimeout(()=>{
          this.showSuccess = false
        },2000)
      } catch(e) {
        this.showSuccessMessage = "An unexpected error occurred. Please try again later";
        this.alertColor = 'danger ';
      }
  }else
  {
    this._router.navigateByUrl('/login')
  }

}
copyToClip() {
    let str:any
    str= document.getElementById('email-signature')
    str= str.innerHTML;
    if(str){
      function listener(e: any) {
        e.clipboardData.setData("text/html",  str);
        e.clipboardData.setData("text/plain" , str);
        e.preventDefault();
      }
      document.addEventListener("copy", listener);
      document.execCommand("copy");
      document.removeEventListener("copy", listener);
      this.showSuccess = true
      this.showSuccessMessage = "Success!  Signature has been copied."
      this.alertColor = "success";
      setTimeout(()=>{
        this.showSuccess = false
      },2000)
    }else {
      this.showSuccess = true
      this.showSuccessMessage = "An unexpected error occurred. Please try again later";
      this.alertColor = 'danger ';
      setTimeout(()=>{
        this.showSuccess = false
      },2000)
    }
};
}
