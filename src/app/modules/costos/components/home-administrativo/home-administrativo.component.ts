import { Component, OnDestroy, OnInit } from '@angular/core';
import { CostosService } from '../../services/costos.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-administrativo',
  templateUrl: './home-administrativo.component.html',
  styleUrls: ['./home-administrativo.component.scss'],
})
export class HomeAdministrativoComponent implements OnInit, OnDestroy {

  listaActividades: any[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private costosService: CostosService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getCostosPorActividad();

    this.costosService.updateCostos$
    .pipe(
      takeUntil(this.destroy$),
    ).subscribe( data => {
      this.getCostosPorActividad();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  private getCostosPorActividad() {
    this.alertService.activarLoading(true);
    this.costosService.getCostosPorTipoActividadAdmin().subscribe((data: any[]) => {
      this.alertService.activarLoading(false);
      this.listaActividades = data;
    }, err => {
      this.alertService.activarLoading(false);
    });
  }
}
