import { Component, OnInit } from '@angular/core';
import { FadeIn } from '../animation';

//Models
import { User } from '../../models/user';

//Services
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'keepers',
  templateUrl: './keepers.component.html',
  animations: [FadeIn],
  providers: [UserService]
})
export class KeepersComponent implements OnInit {
  public title;
  public keepers: User[];
  public urlUser;

  constructor(
    private _userService: UserService
  ){
    this.title = 'Keepers';
    this.urlUser = GLOBAL.url + '/user';
  }

  ngOnInit(){
    this.listAll();
  }

  listAll(){
    this._userService.listKeepers().subscribe(
      response => {
        if(response.users){
          this.keepers = response.users;
        }
      },
      error => {
        console.log(<any>error)
      }
    );
  }

}
