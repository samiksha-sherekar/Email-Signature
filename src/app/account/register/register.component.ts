import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService,){}
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl <number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password = new  FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new FormControl('', [
    Validators.required,
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])
  year: number = new Date().getFullYear();
  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'primary'
  inSubmission = false
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })
  get f() { return this.registerForm.controls; }

  async register() {
    this.inSubmission=true
    if (this.registerForm.invalid) {
      return}
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'primary'
    // this.inSubmission=true

    const {email, password}=this.registerForm.value

    try{
      this.auth.createUser(this.registerForm.value as IUser)
    }catch(e){
      console.log(e);

      this.alertMsg = "An unexpected error occurred. Please try again later";
      this.alertColor = 'danger';
      this.inSubmission = false
      return
    }
    this.alertMsg = "Success! Your account has been created."
    this.alertColor = "success"
  }
}
