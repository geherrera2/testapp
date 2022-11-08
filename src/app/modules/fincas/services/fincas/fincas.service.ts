import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mensajes } from '@shared/enums/mensajes.enum';
import { HttpService } from '@shared/services/http/http.service';
import { map } from 'rxjs/operators';
import { FincasModel, ListaLotesModel } from '../../models/fincas.model';
import { LoteModel } from '../../models/lotes.model';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FincasService {

  private updateFincas = new Subject<any>();
  public updateFincas$ = this.updateFincas.asObservable();

  constructor(
    private httpService: HttpService
  ) {
    this.mensajesFinca();
  }

  eventoActualizarFinca = ( data ) => this.updateFincas.next( data );

  getFincas = () => this.httpService.get('api/farm').pipe( map( (resp: any) => resp.data));

  getDetalleFinca( idFinca: string ){
    return this.httpService.get('api/farm/' + idFinca ).pipe(
      map( (resp: any) => {
          const data = new FincasModel(resp.data);
          return data;
        })
      );
  }

  crearFinca = (dataform) => this.httpService.post('api/farm', dataform);

  actualizarFinca = ( dataform ) => this.httpService.post('api/farm/' + dataform.id, dataform);

  mensajesFinca() {
    return {
      cadastral_record : [ {error: 'required', message: Mensajes.required}],
      department_id : [ {error: 'required', message: Mensajes.required}],
      municipality_id : [ {error: 'required', message: Mensajes.required}],
      village_id : [ {error: 'required', message: Mensajes.required}],
      name : [ {error: 'required', message: Mensajes.required}],
      ubication : [ {error: 'required', message: Mensajes.required}],
      total_area : [ {error: 'required', message: Mensajes.required}],
      holding_id : [ {error: 'required', message: Mensajes.required}],
    };
  }

  eliminarFinca = (id) => this.httpService.delete(`api/farm/${id}`);

  crearFormFinca(){
    return new FormGroup({
      cadastral_record: new FormControl( '', [] ),
      department_id: new FormControl( '', [  Validators.required ] ),
      municipality_id: new FormControl( '', [  Validators.required ] ),
      village_id: new FormControl( '', [  ] ),
      name: new FormControl( '', [  Validators.required ] ),
      ubication: new FormControl( '', [  Validators.required ] ),
      total_area: new FormControl( '', [  Validators.required ] ),
      holding_id: new FormControl( '', [  Validators.required ] ),
    });
  }

}
