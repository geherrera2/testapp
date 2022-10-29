import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert/alert.service';
import { environment } from '../../../../../environments/environment';
import { HttpService } from '../../../shared/services/http/http.service';

const CLIENT = environment.client;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpServices: HttpService,
    private alertService: AlertService
  ) { }

  public login( data: any ) {
    const credentials = {
          grant_type: 'password',
          client_id: CLIENT.id,
          client_secret: CLIENT.secret,
          username: data.email,
          password: data.password,
          scope: ''
        };

    this.alertService.activarLoading(true);
    return this.httpServices.post('oauth/token', credentials);
  }
}
