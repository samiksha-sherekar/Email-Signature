import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignatureRoutingModule } from './signature-routing.module';
import { HomeComponent } from './home/home.component';
import { FormNavBarComponent } from './form-nav-bar/form-nav-bar.component';
import { SignatureComponent } from './signature/signature.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { DesignComponent } from './design/design.component';
import { SocialFormComponent } from './social-form/social-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    FormNavBarComponent,
    SignatureComponent,
    BasicFormComponent,
    ImageFormComponent,
    DesignComponent,
    SocialFormComponent
  ],
  imports: [
    CommonModule,
    SignatureRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule,
  ],
  exports: [HomeComponent]
})
export class SignatureModule { }
