import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private agregarInventario = new Subject<any>();
  public agregarInventario$ = this.agregarInventario.asObservable();

  constructor(
    private httpService: HttpService
  ) { }

  eventoAgregarInventario = () => this.agregarInventario.next();

  crearProducto(dataForm){
    return this.httpService.post('api/product', dataForm);
  }

  getProductos = () => this.httpService.get('api/product');

  getDetalleProducto = (id) => this.httpService.get('api/product/' + id);

  getProductosPorTipo = ( idTipo ) => this.httpService.get('api/product-type/' + idTipo + '/product');

  getInventarioPorTipo = () => this.httpService.get('api/inventory/total/product-type');

  getInventarioProductosPorTipo = (id) => this.httpService.get('api/inventory/total/product/' + id);

  getInventarioProductosHistory = (id) => this.httpService.get('api/inventory/product/' + id);



  crearInventario(dataForm){
    return this.httpService.post('api/inventory', dataForm);
  }

}
