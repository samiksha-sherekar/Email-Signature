import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { ModalService } from '../services/modal.service';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    InputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    InputComponent
  ],
  // providers: [ModalService]
})
export class SharedModule { }
