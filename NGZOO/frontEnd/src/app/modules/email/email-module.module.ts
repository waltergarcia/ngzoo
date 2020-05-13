//Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Import components
import { MainEmailComponent } from './components/main/main-email.component';
import { SaveEmailComponent } from './components/save/save-email.component';
import { ShowEmailComponent } from './components/show/show-email.component';

//Decorate ngModule for load components and modules settings
@NgModule({
  declarations: [
    MainEmailComponent,
    SaveEmailComponent,
    ShowEmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule],
  exports: [MainEmailComponent]
})

export class EmailModule{}
