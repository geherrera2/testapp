import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from '../../services/inventario/inventario.service';
import { AlertService } from '../../../shared/services/alert/alert.service';


@Component({
  selector: 'app-detalle-tipo',
  templateUrl: './detalle-tipo.component.html',
  styleUrls: ['./detalle-tipo.component.scss'],
})
export class DetalleTipoComponent implements OnInit {

  title = '';
  id = '';
  listaTipos: any[] = [];
  textoBuscar = '';

  constructor(
    private route: ActivatedRoute,
    private inventarioService: InventarioService,
    private alertService: AlertService
  ) {
    this.route.params.subscribe(params => {
      this.title  = params.name;
      this.id  = params.id;
      this.alertService.activarLoading(true);
      this.inventarioService.getInventarioProductosPorTipo(this.id).subscribe( (data: any) => {
        this.alertService.activarLoading(false);
        this.listaTipos = data.data;
      }, error => {
        this.alertService.activarLoading(false);
      });
    });
   }

  ngOnInit() {}

  onSearchChange( event ) {
    this.textoBuscar = event.detail.value;
  }

}
