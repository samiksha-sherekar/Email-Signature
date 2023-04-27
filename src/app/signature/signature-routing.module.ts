import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { SocialFormComponent } from './social-form/social-form.component';
import { DesignComponent } from './design/design.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "email-signature",
    pathMatch:'full'
  },
  {
    path: 'email-signature',
    component: HomeComponent,
    data: {
      authOnly: true,
    //   authGuardPipe: redirectUnauthorizedToHome
    },
    // canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'General-Form',
    component : BasicFormComponent
  },
  {
    path: 'Image-Form',
    component : ImageFormComponent
  },
  {
    path: 'Social-Form',
    component : SocialFormComponent
  },
  {
    path: 'Design-Form',
    component : DesignComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignatureRoutingModule { }
