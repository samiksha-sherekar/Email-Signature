import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public auth: AuthService,
    private afAuth :AngularFireAuth,private _router: Router,) { }

  ngOnInit(): void {
  }
  async logout($event:Event){
    $event.preventDefault();
    await this.afAuth.signOut()
    this._router.navigateByUrl('/login')
  }
}
