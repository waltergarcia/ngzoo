import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  public title: string;
  public user: User;
  public status: string;
  public message: string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService){
      this.title = 'Login';
      this.user = new User('','','','','','', '');
    }

  ngOnInit(){
    console.log(this._userService.getIdentity())
    console.log(this._userService.getToken())
  }

  onSubmit(){
    this._userService.signUp(this.user).subscribe(
      response => {
        //User login
        this.identity = response.userFound;
        if(!this.identity ||  !this.identity._id){
          this.status = 'loginError';
          this.message = 'Login error! '+ response.message;
        }else{
          localStorage.setItem('identity', JSON.stringify(this.identity));
          //Get token
          this._userService.signUp(this.user, 'true').subscribe(
            response => {
              this.token = response.token;
              if(this.token.length <= 0){
                alert('The token has not been generated');
              }else{
                localStorage.setItem('token', this.token);
                this.status = 'success';
                this.message = 'Login Success';
                this._router.navigate(['/']);
              }
            },
            error => {
              console.log(<any>error);
            }
          );
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.status = 'errorService';
          this.message = 'Login error! ' + body.message;
        }
      }
    );
  }
}
