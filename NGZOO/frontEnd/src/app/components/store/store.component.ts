import { Component, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FadeIn } from '../animation';

declare var $:any;

@Component ({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  animations: [
    trigger('mark', [
      state('inactive', style({
        border: '5px solid #ccc'
      })),
      state('active', style({
        border: '5px solid yellow',
        background: 'red',
        borderRadius: '50px',
        transform: 'scale(1.2)'
      })),
      transition('inactive => active', animate('300ms linear')),
      transition('active => inactive', animate('300ms linear'))
    ]),
    FadeIn
  ]
})

export class StoreComponent implements OnInit{
  public title;
  public parksName: String;
  public myPark;
  public status;

  constructor(){
    this.title = 'This is a store';
    this.status = 'inactive';
  }

  ngOnInit(){
    $('#textJQ').hide();
    $('#buttonJQ').click(function(){
      $('#textJQ').slideToggle();
    });
    $("#textBox").dotdotdot({});
  }

  showName(){
    console.log(this.parksName);
  }

  showParkData(event){
    console.log(event);
    this.myPark = event;
  }

  changeStatus(status){
    if(status == 'inactive'){
      this.status = 'active'
    }else{
      this.status = 'inactive';
    }
  }
}
