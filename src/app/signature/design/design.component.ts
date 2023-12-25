import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import DesignForm from 'src/app/models/designForm.model';
import { SignService } from 'src/app/services/sign.service';
import firebase from 'firebase/compat/app'
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  FormData:any;
  designData:DesignForm[]=[]
  typeValidationForm!: FormGroup;
  user: firebase.User | null = null
  getDesignData:any[]=[]

  fontFamily = new FormControl('arial', [
    Validators.required,
  ])
  fontSize = new FormControl(16, [
    Validators.required,
  ])
  templateColor = new FormControl ('#4A4F50', [
    Validators.required,
  ])
  backgroundColor = new  FormControl('#FFFFFF', [
    Validators.required,
  ])
  constructor(
    public formBuilder: FormBuilder,
    public sharedService:SignService,
    private auth: AngularFireAuth,
    ) {
      auth.user.subscribe(user => this.user = user)
    this.typeValidationForm = this.formBuilder.group({
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      templateColor: this.templateColor,
      backgroundColor: this.backgroundColor,
    });
    this.FormData=this.typeValidationForm.controls
    
    this.sharedService.designData$
    .subscribe(designData => {
      this.designData = designData
    });
}
get f() {
  return this.typeValidationForm.controls;
}
  ngOnInit(){
    this.sharedService.setDesignData(this.FormData);
    this.getDesignForm()
  }
  getDesignForm(){
    this.sharedService.getSignatureData().subscribe((res: any) => {
      this.getDesignData = []
      res.forEach((element:any, x:any) => {
        if(element.payload.doc.data().uid==this.user?.uid)
        this.getDesignData.push({
          uid: element.payload.doc.uid,
          ...(element.payload.doc.data() as Record<string, unknown>)
        })
      })
      if(this.getDesignData.length>0){
        var getForm:any=this.getDesignData[0].designForm

        this.typeValidationForm.patchValue({
          backgroundColor: getForm.backgroundColor,
          fontFamily: getForm.fontFamily,
          fontSize: getForm.fontSize,
          templateColor: getForm.templateColor,
        })
      }
    })
  }
}
