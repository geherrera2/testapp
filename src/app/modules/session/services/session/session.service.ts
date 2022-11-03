import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token: string;

  constructor(
    // private storage: Storage,
  ) {
  }

  setSession( data: any ){
    this.token = data.access_token;
    this.setRegreshToken(data.refresh_token);
    this.setToken(data.access_token);
  }

  clearSession = () => null;

  getRegreshToken = () => Promise.resolve("refreshToken");
  setRegreshToken = ( data: string ) => 'refreshToken';

  getToken = () => Promise.resolve("token");

  setToken = ( data: string ) => 'token';
}
