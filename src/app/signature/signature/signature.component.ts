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
  sharedData:any=[]
  imageData:any[]=[]
  contactData:any[]=[]
  socialMediaData:any[]=[]
  designData:any[]=[]
  user: firebase.User | null = null
  
  showSuccess = false
  showSuccessMessage = ''
  alertColor = 'primary'
  constructor(
      public sharedService:SignService,
      private auth: AngularFireAuth,
      private _router: Router,private sanitizer: DomSanitizer
    ) {
    auth.user.subscribe(user => this.user = user)
  }

  ngOnInit() {
    this.getBasicData();
    this.getImageData();
    this.getSocialMediaData();
    this.getDesignData()
  }
  // Basic Form
getBasicData(){
  this.sharedService.basicData$
      .subscribe((basicData:any) => {
        this.sharedData=basicData
        console.log(basicData)
      });
}
// Image Data Get
getImageData(){
  this.sharedService.imageData$
      .subscribe(imageData => {
        this.imageData=imageData
        // this.dummyImage=this.imageData[0].profileImage.value=='../../../assets/images/facebook.png'
      });
}
// Social Media Get
getSocialMediaData(){
  this.sharedService.socialMediaData$
      .subscribe(socialMediaData => {
        this.socialMediaData = socialMediaData
      });
}
// Design Data Get
getDesignData(){
  this.sharedService.designData$
      .subscribe(designData => {
        this.designData = designData
      });
}
data:any
async onSubmit(){
  if(this.user?.uid){
    this.data={
      uid: this.user?.uid as string,
      basicForm: {  
        fname:this.sharedData[0].fname.value,
        lname:this.sharedData[0].lname.value,
        email:this.sharedData[0].email.value,
        mobileNo:this.sharedData[0].mobileNo.value,
        company:this.sharedData[0].company.value,
        position:this.sharedData[0].position.value,
        department:this.sharedData[0].department.value,
        address:this.sharedData[0].address.value,
        contacts: this.sharedData[0].contacts.value,
      },
      imageForm : {
        profileImage : this.imageData[0].profileImage.value
      },
      socialMedia : {
        facebookLink:this.socialMediaData[0].facebookLink.value,
        twitterLink: this.socialMediaData[0].twitterLink.value,
        youtubeLink:this.socialMediaData[0].youtubeLink.value,
        instagramLink: this.socialMediaData[0].instagramLink.value,
        linkedinLink:this.socialMediaData[0].linkedinLink.value,
        pinterestLink: this.socialMediaData[0].pinterestLink.value,
      },
      designForm : {
        fontFamily:this.designData[0].fontFamily.value,
        fontSize:this.designData[0].fontSize.value,
        templateColor:this.designData[0].templateColor.value,
        backgroundColor:this.designData[0].backgroundColor.value,
      }
    }
      try {
        await this.sharedService.createSign(this.data)
        this.showSuccess = true
        this.showSuccessMessage = "Success! New signature has been saved."
        this.alertColor = "success"
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
    str= document.getElementById('email')
    str= str.innerHTML;
    
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
        this.alertColor = "success"
};
}
