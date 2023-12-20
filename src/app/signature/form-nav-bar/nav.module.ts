import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { DesignNavFormComponent } from './design-nav-form/design-nav-form.component';
import { ImageFormsComponent } from './image-forms/image-forms.component';

@NgModule({
  declarations: [DesignNavFormComponent, ImageFormsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule,
  ],
  exports: []
})
export class NavModule { }
