import { Component, OnDestroy, OnInit } from '@angular/core';
import { FincasService } from 'src/app/modules/fincas/services/fincas/fincas.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CrearFincaModalComponent } from 'src/app/modules/fincas/components/crear-finca-modal/crear-finca-modal.component';
import { ParametricasService } from '../../../shared/services/parametricas/parametricas.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { Subject } from 'rxjs';
import { groupBy, takeUntil, map, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit , OnDestroy{

  public destroy$: Subject<boolean> = new Subject<boolean>();
  listaTipos: any[] = [];
  modal: any;
  textoBuscar = '';

  constructor(
    private router: Router,
    public modalController: ModalController,
    private parametricasService: ParametricasService,
    private inventarioService: InventarioService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.cargarInventariosPorTipo();
    this.parametricasService.getParametricasInventarios();
    this.inventarioService.agregarInventario$.pipe(
      takeUntil(this.destroy$),
    ).subscribe( data => {
      this.cargarInventariosPorTipo();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  private cargarInventariosPorTipo() {
    this.alertService.activarLoading(true);
    this.inventarioService.getInventarioPorTipo()
    .pipe(
      map( (resp: any) => resp.data),
      // groupBy( (x: any) => x.id ),
      // mergeMap(group => group.pipe(toArray()))
    )
    .subscribe((data: any) => {
      this.alertService.activarLoading(false);
      this.listaTipos = data;
    }, err => {
      this.alertService.activarLoading(false);
    });
  }

  openDetail(data: any){
    this.router.navigate(['dashboard/tabs/fincas/detalle/' + data.tag, { id: data.id, name: data.name }]);
  }

  onSearchChange( event ) {
    this.textoBuscar = event.detail.value;
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: CrearFincaModalComponent,
      cssClass: 'my-custom-class'
    });
    return await this.modal.present();
  }

}
