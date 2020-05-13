import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit{
  public title: string;
  public user: User;
  public status: string;
  public message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService){
      this.title = 'Register';
      this.user = new User('','','','','','','');
    }

  ngOnInit(){
  }

  //Get data from Form
  onSubmit(registerForm){
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user && response.user._id){
          this.status = 'success';
          registerForm.reset();
          this.user = new User('','','','','','','');
        }else{
          this.status = 'error';
          this.message = response.message;
        }
      },
      error => {
        console.log(<any> error);
      }
    );
  }
}
