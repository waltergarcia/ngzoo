import { Component, OnInit } from '@angular/core';

//Models
import { Animal } from '../../../../models/animal';

//Services
import { AnimalService } from '../../../../services/animal.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'list-admin',
  templateUrl: './list-admin.component.html',
  providers: [AnimalService, UserService]
})
export class ListAdminComponent implements OnInit{
  public title: string;
  public animals: Animal[];
  public token;
  public status;
  public message;
  public search;

  constructor(
    private _userService: UserService,
    private _animalService: AnimalService
  ){
    this.title = 'List'
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.listAllAnimals();
  }

  listAllAnimals(){
    this._animalService.listAll().subscribe(
      response => {
        if(response.animals){
          this.animals = response.animals;
        }
      },
      error => {
        console.log(<any>error)
      }
    );
  }

  deleteAnimal(id){
    this._animalService.delete(this.token, id).subscribe(
      response => {
        if(!response.animal){
          this.status = 'error';
          this.message = 'Error in service: ' + response.message;
        }else{
          this.listAllAnimals();
        }
      },
      error => {
        this.status = 'error';
        this.message = 'Error in service: ' + error;
      }
    );
  }
}
