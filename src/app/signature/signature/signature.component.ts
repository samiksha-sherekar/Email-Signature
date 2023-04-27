import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SignService } from 'src/app/services/sign.service';
import firebase from 'firebase/compat/app'
import { Router } from '@angular/router';
import { ImageDetails } from 'src/app/models/imageForm.model';

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
  constructor(
      public sharedService:SignService,
      private auth: AngularFireAuth,
      private _router: Router,
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
      .subscribe(basicData => {
        this.sharedData=basicData
      });
}
// Image Data Get
getImageData(){
  this.sharedService.imageData$
      .subscribe(imageData => {
        this.imageData=imageData
      });
}
// Social Media Get
getSocialMediaData(){
  this.sharedService.socialMediaData$
      .subscribe(socialMediaData => {
        this.socialMediaData = socialMediaData
        console.log(this.socialMediaData)
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
        name:this.sharedData[0].name.value,
        company:this.sharedData[0].company.value,
        position:this.sharedData[0].position.value,
        department:this.sharedData[0].department.value,
        contacts: this.sharedData[0].contacts.value,
      },
      imageForm : {
        profileImage : this.imageData[0].profileImage.value
      },
      socialMedia : {
        socialMediaDetails : this.socialMediaData[0].socialMedia.value,
      },
      designForm : {
        fontFamily:this.designData[0].fontFamily.value,
        fontSize:this.designData[0].fontSize.value,
        templateColor:this.designData[0].templateColor.value,
        backgroundColor:this.designData[0].backgroundColor.value,
      }
    }
      // console.log("hi",this.data.basicForm.contacts)
      try {
        await this.sharedService.createSign(this.data)
      } catch(e) {
      console.error(e)
      }
  }else
  {
    this._router.navigateByUrl('/login')
  }

}

 copyToClip() {
   let str:any
   str= document.getElementById('foo')
   str= str.innerHTML
  //  console.log(str)
  function listener(e: any) {
    e.clipboardData.setData("text/html", str);
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
};

async copy($event:MouseEvent, elementContentToCopy:any){
  console.log(elementContentToCopy)
  $event.preventDefault()
  if(!elementContentToCopy){
    return
  }
  let image = await fetch('/laptop.png'),
  blob = await image.blob();
  await navigator.clipboard.write([
    new ClipboardItem({ [blob.type]: blob })
  ]);
  
  // await navigator.clipboard.write(elementContentToCopy.style.backgroundColor)
  // alert("copy")
}
}
