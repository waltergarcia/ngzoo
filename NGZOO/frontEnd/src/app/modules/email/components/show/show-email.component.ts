import { Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'show-email',
  templateUrl: './show-email.component.html'
})

export class ShowEmailComponent implements DoCheck, OnInit {
  title = 'Show Email';
  emailContact: string;

  ngOnInit(){
    this.emailContact = localStorage.getItem('emailContact');
  }

  ngDoCheck(){
    this.emailContact = localStorage.getItem('emailContact');
  }

  deleteEmail(){
    localStorage.removeItem('emailContact');
  }
}
