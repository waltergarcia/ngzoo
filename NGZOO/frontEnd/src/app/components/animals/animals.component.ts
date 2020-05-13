import { Component, OnInit } from '@angular/core';
import { FadeIn } from '../animation';

//Models
import { Animal } from '../../models/animal';

//Services
import { AnimalService } from '../../services/animal.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'animals',
  templateUrl: './animals.component.html',
  animations: [FadeIn],
  providers: [AnimalService]
})
export class AnimalsComponent implements OnInit {
  public title;
  public animals: Animal[];
  public urlAnimal;

  constructor(
    private _animalService: AnimalService
  ){
    this.title = 'Animals';
    this.urlAnimal = GLOBAL.url + '/animal';
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
}
