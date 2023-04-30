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
  
  FormData:any[]=[]
  basicData:BasicForm[]=[];
  user: firebase.User | null = null
  fname = new FormControl('Sam', [
    Validators.required,
  ])
  lname = new FormControl('Smith', [
    Validators.required,
  ])
  email = new FormControl('sam@gmail.com', [
    Validators.required,
  ])
  mobileNo = new FormControl('8888888888', [
    Validators.required,
  ])
  company = new FormControl('My Company', [
    Validators.required,
  ])
  position = new FormControl ('Software Developer', [
    Validators.required,
  ])
  department = new  FormControl('IT', [
    Validators.required,
  ])
  address = new  FormControl('Street, City, Pin', [
    Validators.required,
  ])
  contactFields = new  FormControl('', [
    Validators.required,
  ])
  contactValue = new  FormControl('', [
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
      contacts: this.formBuilder.array([]),
    });
    this.FormData.push(this.typeValidationForm.controls)

    this.sharedService.basicData$
    .subscribe(basicData => {
      this.basicData = basicData
    });
}

field(): FormGroup {
  return this.formBuilder.group({
    contactFields:'',
    contactValue:''
  });
}
get contacts(): FormArray {
  return this.typeValidationForm.get('contacts') as FormArray;
}
get f() {
  return this.typeValidationForm.controls;
}
  ngOnInit(){
    this.sharedService.setData(this.FormData);
    this.getBasicForm()
  }
  
  getBFData:any[]=[]
  getBasicForm(){
  
    this.sharedService.getSignatureData().subscribe((res: any) => {
      this.getBFData = []
      res.forEach((element:any, x:any) => {
        if(element.payload.doc.data().uid==this.user?.uid)
        this.getBFData.push({
          uid: element.payload.doc.uid,
          ...(element.payload.doc.data() as Record<string, unknown>)
        })
      })
      var getForm=this.getBFData[0].basicForm

      var contactData=this.getBFData[0].basicForm.contacts

      if (contactData) {
        contactData.forEach((element:any, i:any) => {
          // contactData[i].contactFields=element.contactFields;
          // contactData[i].contactValue=element.contactValue;
          this.addField();
        });
      }
      this.typeValidationForm.patchValue({
        fname: getForm.fname,
        lname: getForm.lname,
        email: getForm.email,
        mobileNo: getForm.mobileNo,
        company: getForm.company,
        position: getForm.position,
        department: getForm.department,
        address: getForm.address,
        contacts: contactData !=null?contactData:[]
      })
    })
  }
  // Dynamic form
  addField() {
    let fg = this.field();
		this.contacts.push(this.field());
    console.log("Add field")
  }
  removeField(i: number) {
    this.contacts.removeAt(i);
    // if (confirm('Are you sure you want to delete this element?')) {
    //   this.contacts.removeAt(i);
    // }
  }
}
