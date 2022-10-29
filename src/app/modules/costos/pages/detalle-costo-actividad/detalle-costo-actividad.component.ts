import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostosService } from '../../services/costos.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-detalle-costo-actividad',
  templateUrl: './detalle-costo-actividad.component.html',
  styleUrls: ['./detalle-costo-actividad.component.scss'],
})
export class DetalleCostoActividadComponent implements OnInit {

  title = '';
  id = '';
  tipoCosto = '';
  listaHistorial: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private costosService: CostosService,
    private alertService: AlertService
    ) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.title  = params.name;
      this.id  = params.id;
      this.tipoCosto = params.type;

      this.alertService.activarLoading(true);
      if ( this.tipoCosto === 'actividad'){
        this.costosService.getCostosPorTipoActividadDetalle(this.id).subscribe( (data: any) => {
          this.alertService.activarLoading(false);
          this.listaHistorial = data.costs;
        }, err => this.alertService.activarLoading(false));
      } else {
        this.costosService.getCostosPorTipoActividadAdminDetalle(this.id).subscribe( (data: any[]) => {
          this.alertService.activarLoading(false);
          this.listaHistorial = data;
        }, err => this.alertService.activarLoading(false));
      }
    });
  }

}
