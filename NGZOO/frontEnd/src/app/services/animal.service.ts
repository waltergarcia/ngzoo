import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';

@Injectable()
export class AnimalService{
  private urlAnimal: string;

  constructor(private _http: Http){
    this.urlAnimal = GLOBAL.url + '/animal';
  }

  register(token, animal){
    let data = JSON.stringify(animal);
    let urlRegister = this.urlAnimal + '/register';
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': token});

    return this._http.post(urlRegister, data, {headers: headers})
            .map(res => res.json());
  }

  listAll(){
    let urlListAll = this.urlAnimal + '/list/all';

    return this._http.get(urlListAll).map(res => res.json());
  }

  listById(id){
    let urlListById = this.urlAnimal + '/list/byId/' + id;

    return this._http.get(urlListById).map(res => res.json());
  }

  update(token, id, animal){
    let urlUpdate = this.urlAnimal + '/update/' + id;
    let data = JSON.stringify(animal);
    let headers = new Headers({
                      'Content-Type': 'application/json',
                      'Authorization': token});

    return this._http.put(urlUpdate, data, {headers: headers})
                        .map(res => res.json());
  }

  delete(token, id){
    let urlDelete = this.urlAnimal + '/delete/' + id;
    let headers = new Headers({
                      'Content-Type': 'application/json',
                      'Authorization': token});
    let options = new RequestOptions({headers: headers});

    return this._http.delete(urlDelete, options).map(res => res.json());
  }
}
