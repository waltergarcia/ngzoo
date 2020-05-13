import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Models
import { Animal } from '../../../../models/animal';

//Services
import { GLOBAL } from '../../../../services/global';
import { AnimalService } from '../../../../services/animal.service';
import { UserService } from '../../../../services/user.service';
import { UploadService } from '../../../../services/upload.service';

@Component({
  selector: 'edit-admin',
  templateUrl: '../add/add-admin.component.html',
  providers: [AnimalService, UserService, UploadService]
})
export class EditAdminComponent implements OnInit{
  public filesToUpload: Array<File>;
  public title: string;
  public titlePage: string;
  public animal: Animal;
  public urlAnimal: string;
  public token;
  public status;
  public resultMsg;
  public isEdit;
  public titleBtn;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService,
    private _uploadService: UploadService
  ){
    this.titlePage = 'Edit';
    this.title = 'Save';
    this.animal = new Animal('','','',2020,'','');
    this.token = this._userService.getToken();
    this.urlAnimal = GLOBAL.url + '/animal';
    this.isEdit = true;
  }

  ngOnInit(){
    this.listById()
  }

  onSubmit(){
    var id = this.animal._id;
    this._animalService.update(this.token, id, this.animal).subscribe(
      response => {
        if(!response.animal){
          this.status = 'error';
        }else{
          this.status = 'updated'
          this.resultMsg = 'Animal updated successful'
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

          //this._router.navigate(['/animal', this.animal._id]);
        }
      },
      error => {
        var errorMesaje = <any>error;

        if(errorMesaje != null){
          this.status = 'error';
        }
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  listById(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._animalService.listById(id).subscribe(
        response => {
          if(!response.animal){
            this._router.navigate(['/home']);
          }else{
            this.animal = response.animal;
          }
        },
        error => {
          console.log(<any>error)
          this._router.navigate(['/home']);
        }
      );
    });
  }
}
