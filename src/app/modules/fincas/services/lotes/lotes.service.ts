import { Injectable } from '@angular/core';
import { Mensajes } from '@shared/enums/mensajes.enum';
import { HttpService } from '@shared/services/http/http.service';
import { map } from 'rxjs/operators';
import { LoteModel } from '../../models/lotes.model';
import { ListaLotesModel } from '../../models/fincas.model';
import { Subject } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LotesService {

  private updateLotes = new Subject<any>();
  public updateLotes$ = this.updateLotes.asObservable();

  constructor(
    private httpService: HttpService, private lotesService: LotesService
  ) { }

  eventoActualizarLote( data ){
    this.updateLotes.next( data );
  }

  getLotes( idFinca: string ) {
    return this.httpService.get('api/farm/' + idFinca + '/lots')
      .pipe(
        map( (resp: any) => resp.data.map( x => new ListaLotesModel(x)) )
      );
  }

  getDetalleLote( idLote: string ){
    return this.httpService.get('api/lot/' + idLote ).pipe(
      map( (resp: any) => new LoteModel(resp.data) )
      );
  }

  crearLote = (dataform) => this.httpService.post('api/lot', dataform);
  actualizarLote = ( dataform ) => this.httpService.post('api/lot/' + dataform.id, dataform);

  mensajesLote() {
    return{
      name : [ {error: 'required', message: Mensajes.required}],
      total_area : [
        {error: 'required', message: Mensajes.required},
        {error: 'areaDisponible', message: 'El área total no puede ser superior al área disponible.'},
      ],
      ubication : [ {error: 'required', message: Mensajes.required}],
      above_sea_level : [ {error: 'required', message: Mensajes.required}],
      description : [ {error: 'required', message: Mensajes.required}],
      varietie_coffee_id : [ {error: 'required', message: Mensajes.required}],
      renewal_id : [ {error: 'required', message: Mensajes.required}],
      type_renewal_id : [ {error: 'required', message: Mensajes.required}],
      date_renewal : [ {error: 'required', message: Mensajes.required}],
      age : [ {error: 'required', message: Mensajes.required}],
      brightness_id : [ {error: 'required', message: Mensajes.required}],
      range_brightness : [ {error: 'required', message: Mensajes.required}],
      type_somber_id : [ {error: 'required', message: Mensajes.required}],
      stroke_id : [ {error: 'required', message: Mensajes.required}],
      distance_sites : [ {error: 'required', message: Mensajes.required}],
      distance_furrow : [ {error: 'required', message: Mensajes.required}],
      stems_sites : [ {error: 'required', message: Mensajes.required}],
      density_hectares : [ {error: 'required', message: Mensajes.required}],
      sites_crop : [ {error: 'required', message: Mensajes.required}],
      farm_id : [ {error: 'required', message: Mensajes.required}],
    };
  }

  eliminarLote = (id) => this.httpService.delete(`api/lot/${id}`);

  validarAreaLote(valor: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const tempValue = control.value === '' ? 0 : parseInt(control.value);
      const temp = tempValue <= valor ? false : true ;
      return temp ? {areaDisponible: true } : null;
    };
  }

  createrFormLot(areaDisponible:number = 0){
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      total_area: new FormControl('', [Validators.required, this.lotesService.validarAreaLote(areaDisponible)]),
      ubication: new FormControl('', [Validators.required]),
      above_sea_level: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      varietie_coffee_id: new FormControl('', [Validators.required]),
      renewal_id: new FormControl('', [Validators.required]),
      type_renewal_id: new FormControl('', [Validators.required]),
      date_renewal: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      brightness_id: new FormControl('', [Validators.required]),
      range_brightness: new FormControl('', [Validators.required]),
      type_somber_id: new FormControl('', [Validators.required]),
      stroke_id: new FormControl('', [Validators.required]),
      distance_sites: new FormControl('', [Validators.required]),
      distance_furrow: new FormControl('', [Validators.required]),
      stems_sites: new FormControl('', [Validators.required]),
      density_hectares: new FormControl('', [Validators.required]),
      sites_crop: new FormControl('', [Validators.required]),
      farm_id: new FormControl('', [Validators.required]),
      number_plants: new FormControl('', [Validators.required]),
    });
  }
}
