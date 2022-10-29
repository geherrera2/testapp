import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SessionService } from 'src/app/modules/session/services/session/session.service';

const API = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  public get( endPoint: string,  dataHeader?: HttpHeaders , params?: HttpParams, ) {
    const headers = dataHeader ?? new HttpHeaders()
                                    .set('Authorization', 'Bearer ' + this.sessionService.token)
                                    .set('Content-Type', 'application/json');
    return this.http.get(`${API}/${endPoint}`, { params , headers});
  }

  public post( endPoint: string, data?: any , header?: HttpHeaders) {
      const headers = header ?? new HttpHeaders()
                                      .set('Content-Type', 'application/json')
                                      .set('Authorization', 'Bearer ' + this.sessionService.token);

      return this.http.post(`${API}/${endPoint}`, data, { headers });
  }

  public delete( endPoint: string,  dataHeader?: HttpHeaders , params?: HttpParams, ) {
    const headers = dataHeader ?? new HttpHeaders()
                                    .set('Authorization', 'Bearer ' + this.sessionService.token)
                                    .set('Content-Type', 'application/json');
    return this.http.delete(`${API}/${endPoint}`, { params , headers});
  }

}
