import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http/http.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostosService {

  private updateCostos = new Subject<any>();
  public updateCostos$ = this.updateCostos.asObservable();

  constructor(
    private httpService: HttpService
  ) { }

  eventoActualizarCosto = ( data ) => this.updateCostos.next( data );

  getTipoCostos = () => this.httpService.get(`api/type-cost`);
  getCostosPorTipoActividad = () => this.httpService.get(`api/cost/activity`);
  getCostosPorTipoActividadDetalle = ( idTipoActivadad ) => this.httpService.get(`api/cost/type-activity/${idTipoActivadad}/details`);

  getCostosPorTipoActividadAdmin = () => this.httpService.get(`api/cost/administrative`);
  getCostosPorTipoActividadAdminDetalle = ( idTipoActivadad ) => this.httpService.get(`api/cost/type-category/${idTipoActivadad}/details`);

  crearCostoActividad = ( dataForm ) => this.httpService.post(`api/cost`, dataForm);


}
