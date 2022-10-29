import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token: string;

  constructor(
    private storage: Storage,
  ) {
  }

  setSession( data: any ){
    this.token = data.access_token;
    this.setRegreshToken(data.refresh_token);
    this.setToken(data.access_token);
  }

  clearSession = () => this.storage.clear();

  getRegreshToken = () => this.storage.get('refreshToken');
  setRegreshToken = ( data: string ) => this.storage.set('refreshToken', data);

  getToken = () => this.storage.get('token');
  setToken = ( data: string ) => this.storage.set('token', data);
}
