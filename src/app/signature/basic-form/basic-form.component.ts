import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import BasicForm from 'src/app/models/bacisForm.model';
import ISignature from 'src/app/models/signature.model';
import { SignService } from 'src/app/services/sign.service';
import firebase from 'firebase/compat/app'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {
  
  FormData:any
  basicData:BasicForm[]=[];
  user: firebase.User | null = null;
  getBFData:any
  typesubmit: boolean=false;
  fname = new FormControl('sam', [
    Validators.required,
  ])
  lname = new FormControl('smith', [
    Validators.required,
  ])
  email = new FormControl('demo@gmail.com', [
    Validators.required,
  ])
  mobileNo = new FormControl('9734343434', [
    Validators.required,
  ])
  company = new FormControl('text', [
    Validators.required,
  ])
  position = new FormControl ('Developer', [
    Validators.required,
  ])
  department = new  FormControl('IT', [
    Validators.required,
  ])
  address = new  FormControl('Pune', [
    Validators.required,
  ])
  contactFields = new  FormControl('', [
    Validators.required,
  ])
   
  typeValidationForm!: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    public sharedService:SignService,
    private auth: AngularFireAuth,
    ) {
      auth.user.subscribe(user => this.user = user)
    this.typeValidationForm = this.formBuilder.group({
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      mobileNo: this.mobileNo,
      company: this.company,
      position: this.position,
      department: this.department,
      address: this.address,
    });

    this.FormData=this.typeValidationForm.controls
    this.sharedService.basicData$
    .subscribe(basicData => {
      this.basicData = basicData;
    });
}

get f() {
  return this.typeValidationForm.controls;
}
  ngOnInit(){
    this.sharedService.setData(this.FormData);
    this.getBasicForm()
  }
  
  
  getBasicForm(){
    let data=this.sharedService.getLocalStorageData()
    this.sharedService.getSignatureData().subscribe((res: any) => {
      this.getBFData = []
      res.forEach((element:any, x:any) => {
        if(element.payload.doc.data().uid==this.user?.uid)
        this.getBFData.push({
          uid: element.payload.doc.uid,
          ...(element.payload.doc.data() as Record<string, unknown>)
        })
      })
      if(this.getBFData.length>0 ||data.basicForm){
        var getForm=this.getBFData.basicForm || data.basicForm;
        this.typeValidationForm.patchValue({
          fname: getForm.fname,
          lname: getForm.lname,
          email: getForm.email,
          mobileNo: getForm.mobileNo,
          company: getForm.company,
          position: getForm.position,
          department: getForm.department,
          address: getForm.address,
        })
      }
    })
  }
}
