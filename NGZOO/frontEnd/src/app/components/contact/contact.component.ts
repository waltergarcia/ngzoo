import { Component, OnInit } from '@angular/core';
import { FadeIn } from '../animation';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  animations: [FadeIn]
})
export class ContactComponent implements OnInit {
  const
  title = 'Contact';
  emailContact: string;

  ngOnInit(){
    console.log('contact.component loaded');
  }

  saveEmail(){
    localStorage.setItem('emailContact', this.emailContact);
    console.log("localStorage: " + localStorage.getItem('emailContact'));
  }
}
