import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageDetails } from 'src/app/models/imageForm.model';
import ISignature from 'src/app/models/signature.model';
import { SignService } from 'src/app/services/sign.service';
import firebase from 'firebase/compat/app'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {
  user: firebase.User | null = null
  typeValidationForm!: FormGroup; // type validation form
  FormData:any[]=[]
  imageData:ImageDetails[]=[];
  typesubmit: boolean=false; 
  imageType=true; logo: any;
  sizeError=false;
  imageChangedEvent: any = '';
  image!: string;
  filename!: string;
    file_label:string="Choose File";
    img!: string | ArrayBuffer;
    dummyImage="../../../assets/images/facebook.png"
    profileImage = new  FormControl('../../../assets/images/profile.jpg', [
      Validators.required,
    ])
  constructor(
    public formBuilder: FormBuilder,
    private sharedService: SignService,
    private auth: AngularFireAuth,
    ) {
      auth.user.subscribe(user => this.user = user)

    this.typeValidationForm = this.formBuilder.group({
      profileImage: this.profileImage,
    });
    this.FormData.push(this.typeValidationForm.controls)

    this.sharedService.imageData$
    .subscribe(imageData => {
      this.imageData = imageData
    });
  }

  ngOnInit(): void {
    this.sharedService.setImageData(this.FormData);
    this.getImageForm()
  }
  get f() {
    return this.typeValidationForm.controls;
  }

  onFileSelected(event:any) {
    
    if(event.addedFiles[0].type=='image/png' || event.addedFiles[0].type=='image/jpg' || event.addedFiles[0].type=='image/jpeg'){
        this.imageType=true;
    }else{
      this.imageType=false;
      return;
    }
    if( event.addedFiles[0].size>2000000){
      this.sizeError=true;
      return;
    }else{
      this.sizeError=false
    }
    this.logo=event.addedFiles[0];
    if ( event.addedFiles[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.f.profileImage.setValue(e.target.result)
      }
      reader.readAsDataURL(event.addedFiles[0]);
    }
    }

    onRemove() {
      this.logo='';
      this.typeValidationForm.patchValue({
        profileImage:this.logo,
      });
    }

    getImageData:any[]=[]
  getImageForm(){
    this.sharedService.getSignatureData().subscribe((res: any) => {
      this.getImageData = []
      res.forEach((element:any, x:any) => {
        if(element.payload.doc.data().uid==this.user?.uid)
        this.getImageData.push({
          uid: element.payload.doc.uid,
          ...(element.payload.doc.data() as Record<string, unknown>)
        })
      })
      var getForm:any=this.getImageData[0].imageForm
      // this.logo = getForm.profileImage
      // console.log(this.logo)
      this.typeValidationForm.patchValue({
        profileImage: getForm.profileImage,
      })
    })
  }
}
