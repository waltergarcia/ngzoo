import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-email',
  templateUrl: './main-email.component.html'
})

export class MainEmailComponent implements OnInit{
  title = 'Email Module';

  ngOnInit(){
    console.log("Main Email component loaded");
  }
}
