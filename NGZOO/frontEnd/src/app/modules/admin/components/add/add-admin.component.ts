import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Animal } from '../../../../models/animal';

//Services
import { GLOBAL } from '../../../../services/global';
import { AnimalService } from '../../../../services/animal.service';
import { UserService } from '../../../../services/user.service';
import { UploadService } from '../../../../services/upload.service';

@Component({
  selector: 'add-admin',
  templateUrl: './add-admin.component.html',
  providers: [AnimalService, UserService, UploadService]
})
export class AddAdminComponent {
  public filesToUpload: Array<File>;
  public title: string;
  public animal: Animal;
  public urlAnimal: string;
  public identity;
  public token;
  public isEdit;
  public status;
  public resultMsg;
  public titlePage;

  constructor(
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService,
    private _uploadService: UploadService
  ){
    this.title = 'Register'
    this.animal = new Animal('','','',2020,'','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.urlAnimal = GLOBAL.url + '/animal';
    this.isEdit = false;
  }

  onSubmit(){
    this.animal.user = this.identity;
    this._animalService.register(this.token, this.animal).subscribe(
      response => {
        if(!response.animal){
          console.log('Error in response')
        }else{
          this.animal = response.animal;

          //Upload image
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(
              this.urlAnimal + '/upload/image/' + this.animal._id,
              [],
              this.filesToUpload,
              this.token,
              'image')
            .then((result: any) => {
              this.animal.image = result.image;
            });
          }

          this._router.navigate(['/admin-panel/list']);
        }
      },
      error => {
        var errorMesaje = <any>error;

        if(errorMesaje != null){
          console.log('Error in service')
        }
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }
}
