import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Models
import { Animal } from '../../models/animal';
import { User } from '../../models/user';

//Services
import { GLOBAL } from '../../services/global';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'animal-detail',
  templateUrl: './animal-detail.component.html',
  providers: [AnimalService]
})
export class AnimalDetailComponent implements OnInit {
  public title: string;
  public animal: Animal;
  public animalUser: User;
  public urlAnimal: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService
  ){
    this.title = 'Animal Detail';
    this.urlAnimal = GLOBAL.url + '/animal';
  }

  ngOnInit(){
    this.listById()
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
            //this.animalUser = JSON.parse(this.animal.user);
            //console.log(this.animal.user)
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
