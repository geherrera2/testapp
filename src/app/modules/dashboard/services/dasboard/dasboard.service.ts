import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DasboardService {

  constructor(
    private http: HttpService
  ) { }

  prueba(){
    this.http.get('api/user');
  }
}
