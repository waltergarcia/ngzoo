import { Component } from '@angular/core';

@Component({
  selector: 'save-email',
  templateUrl: './save-email.component.html'
})

export class SaveEmailComponent{
  title = 'Save Email';
  emailContact: string;

  saveEmail(){
    localStorage.setItem('emailContact', this.emailContact);
  }
}
