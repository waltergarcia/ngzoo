import { Component, OnInit } from '@angular/core';
import { FadeIn } from '../animation';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  animations: [FadeIn]
})
export class HomeComponent implements OnInit {
  title = 'Welcome to NGZOO';

  ngOnInit(){
  }

}
