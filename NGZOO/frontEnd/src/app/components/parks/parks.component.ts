import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css']
})

export class ParksComponent implements OnChanges, OnInit, OnDestroy{
  @Input() name: String;
  @Input('meters') m2: number;
  public vegetable: String;
  public open: boolean;

  @Output() sendData = new EventEmitter();

  constructor() {
    this.name = 'Natural Park of El Salvador: El Imposible';
    this.m2 = 1000;
    this.vegetable = "High";
    this.open = false;
  }

  ngOnChanges(changes: SimpleChanges){
    //console.log(changes);
    console.log("ngOnChanges launched");
  }

  ngOnInit(){
    console.log("ngOnInit launched");
  }

  ngOnDestroy(){
    console.log("Delete component");
  }

  submitEvent(){
    this.sendData.emit({
      'name': this.name,
      'm2': this.m2,
      'vegetable': this.vegetable,
      'open': this.open
    });
  }
}
