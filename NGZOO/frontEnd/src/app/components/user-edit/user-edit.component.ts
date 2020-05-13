import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit{
  public filesToUpload: Array<File>;
  public title: string;
  public user: User;
  public urlUser: string;
  public identity;
  public token;
  public status;

  constructor(
    private _userService: UserService,
    private _uploadService: UploadService
  ){
    this.title = 'Update user info';
    this.urlUser = GLOBAL.url + '/user';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
  }

  ngOnInit(){

  }

  onSubmit(){
    this._userService.updateUser(this.user).subscribe(
      response => {
        if(!response.user){
          this.status = 'error';
        }else{
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));

          //Upload image
          this._uploadService.makeFileRequest(
                this.urlUser + '/upload/profile-image/' + this.user._id,
                [],
                this.filesToUpload,
                this.token,
                'image')
            .then((result: any) => {
              this.user.image = result.image;
              localStorage.setItem('identity', JSON.stringify(this.user));
            });
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }
}
