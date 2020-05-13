import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
  private urlUser: string;
  public identity;
  public token;

  constructor(private _http: Http){
    this.urlUser = GLOBAL.url + '/user';
  }

  register(userToRegister){
    let urlRegister = this.urlUser + '/register';
    let data = JSON.stringify(userToRegister);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(urlRegister, data, {headers: headers})
            .map(res => res.json());
  }

  signUp(userToLogin, getToken = null){
    if(getToken != null){
      userToLogin.token = getToken;
    }

    let urlLogin = this.urlUser + '/login';
    let data = JSON.stringify(userToLogin);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(urlLogin, data, {headers: headers})
            .map(res => res.json());
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != 'undefined'){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != 'undefined'){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  updateUser(userToUpdate){
    let urlUpdate = this.urlUser + '/update/' + userToUpdate._id;
    let data = JSON.stringify(userToUpdate);
    let headers = new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.getToken()});

    return this._http.put(urlUpdate, data, {headers: headers})
            .map(res => res.json());
  }

  listKeepers(){
    let urlListKeepers = this.urlUser + '/keepers';

    return this._http.get(urlListKeepers).map(res => res.json());
  }
}
