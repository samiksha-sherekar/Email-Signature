import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: firebase.User | null = null
  constructor(public auth: AuthService,
    private afAuth :AngularFireAuth,private _router: Router,) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => this.user = user)
  }
  async logout($event:Event){
    $event.preventDefault();
    await this.afAuth.signOut()
    this._router.navigateByUrl('/login')
  }
}
