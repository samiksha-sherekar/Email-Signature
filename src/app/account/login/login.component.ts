import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showpassword =false

  credentials = {
    email: '',
    password: ''
  }
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  password = new  FormControl('', [
    Validators.required,
    Validators.required,Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)])

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });
  showAlert = false
  alertMsg = 'Please wait! We are logging you in.'
  alertColor = 'primary'
  inSubmission = false
  
  year: number = new Date().getFullYear();
  constructor(private auth : AngularFireAuth,private formBuilder: FormBuilder,private router: Router ) {
    
   }

  ngOnInit(): void {
    
  }
  get f() { return this.loginForm.controls; }

  async login() {
    this.inSubmission=true
    if (this.loginForm.invalid) {
      return}
    this.showAlert = true
    this.alertMsg = 'Please wait! We are logging you in.'
    this.alertColor = 'primary'
      try{
        await this.auth.signInWithEmailAndPassword(
          this.loginForm.value.email as string, this.loginForm.value.password as string
        )
      }catch(e){
  
        this.alertMsg = "An unexpected error occurred. Please try again later";
        this.alertColor = 'danger ';
        this.inSubmission = false
        return
      }
    this.alertMsg = "Success! You are now logged in."
    this.alertColor = "success "
    this.router.navigate(['/email-signature'])
  }

}
