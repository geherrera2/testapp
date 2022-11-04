import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrearProductoComponent } from '../../components/crear-producto/crear-producto.component';
import { InventarioService } from '../../services/inventario/inventario.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  listaProductos: any[] = [];
  textoBuscar = '';

  constructor(
    public modalController: ModalController,
    private inventarioService: InventarioService
  ) { }

  ngOnInit() {
    // TODO, Validar unit test
    // this.inventarioService.getProductos().subscribe( ( resp: any ) => {
    //   this.listaProductos = resp.data;
    // });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CrearProductoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    this.inventarioService.getProductos().subscribe( ( resp: any ) => {
      this.listaProductos = resp.data;
    });

  }

  onSearchChange( event ) {
    this.textoBuscar = event.detail.value;
  }

}
