import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-nav-bar',
  templateUrl: './form-nav-bar.component.html',
  styleUrls: ['./form-nav-bar.component.css']
})
export class FormNavBarComponent implements OnInit {
  name = '!!!';
  viewMode = 'tab1';
  tabValue:any ="general"
  constructor() { }

  ngOnInit(): void {
  }
  tabChange(data:any){
    this.tabValue = data
  }
}
