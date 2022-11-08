import { Injectable } from '@angular/core';
import { Mensajes } from '@shared/enums/mensajes.enum';
import { map } from 'rxjs/operators';
import { HttpService } from '../../../shared/services/http/http.service';
import { DetalleAnalisisModel, ListaAnalisisModel } from '../../models/lotes.model';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  detalleAnalisis: any;

  private updateAnalisis = new Subject<any>();
  public updateAnalisis$ = this.updateAnalisis.asObservable();

  constructor(
    private httpService: HttpService
  ) { }

  eventoActualizarAnalisis = ( data ) => this.updateAnalisis.next( data );

  crearAnalisis = (dataform) => this.httpService.post('api/analysis', dataform);
  actualizarAnalisis = ( dataform ) => this.httpService.post('api/analysis/' + dataform.id, dataform);


  getAnalisisPorLote( idLote: string ) {
    return this.httpService.get('api/lot/' + idLote + '/analysis')
      .pipe(
        map( (resp: any) => resp.data.map( x => new ListaAnalisisModel(x)) )
      );
  }

  getDetalleAnalisis( id: string ){
    return this.httpService.get('api/analysis/' + id ).pipe(
      map( (resp: any) => {
        return new DetalleAnalisisModel(resp.data);
        })
      );
  }

  mensajesAnalisis() {
    return {
      analysis_date : [ {error: 'required', message: Mensajes.required}],
      ph : [ {error: 'required', message: Mensajes.required}],
      organic_matter : [ {error: 'required', message: Mensajes.required}],
      phosphates : [ {error: 'required', message: Mensajes.required}],
      calcium : [ {error: 'required', message: Mensajes.required}],
      magnesium : [ {error: 'required', message: Mensajes.required}],
      potassium : [ {error: 'required', message: Mensajes.required}],
      aluminum : [ {error: 'required', message: Mensajes.required}],
      sulphur : [ {error: 'required', message: Mensajes.required}],
      texture : [ {error: 'required', message: Mensajes.required}],
      lot_id : [ {error: 'required', message: Mensajes.required}],
    };
  }

  eliminarAnalisis = (id) => this.httpService.delete(`api/analysis/${id}`);

  createFormAnalisis(idLote = ''){
    return new FormGroup({
      analysis_date: new FormControl( '', [Validators.required] ),
      ph: new FormControl( '', [] ),
      organic_matter: new FormControl( '', [] ),
      phosphates: new FormControl( '', [] ),
      calcium: new FormControl( '', [] ),
      magnesium: new FormControl( '', [] ),
      potassium: new FormControl( '', [] ),
      aluminum: new FormControl( '', [] ),
      sulphur: new FormControl( '', [] ),
      texture: new FormControl( '', [] ),
      lot_id: new FormControl( idLote, [] ),
    });
  }
}
