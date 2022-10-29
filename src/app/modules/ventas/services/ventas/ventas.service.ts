import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {


  private updateVentas = new Subject<any>();
  public updateVentas$ = this.updateVentas.asObservable();


  constructor(
    private httpService: HttpService
  ) { }

  crearVenta = ( dataForm ) => this.httpService.post(`api/sale`, dataForm);

  getVentas = ( farm: any, lot: any , dateInit: string, dateEnd: string ) => this.httpService.get(`api/sale/${farm}/${lot}?initial_date=${dateInit}&final_date=${dateEnd}`);
  getTipoVentasCafe = () => this.httpService.get(`api/type-coffee-sale`);

  eventoActualizarVentas = ( data ) => this.updateVentas.next( data );
}
