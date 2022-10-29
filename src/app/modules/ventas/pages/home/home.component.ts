import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LotesService } from '../../../fincas/services/lotes/lotes.service';
import { FincasService } from '../../../fincas/services/fincas/fincas.service';
import { Router } from '@angular/router';
import { VentasService } from '../../services/ventas/ventas.service';
import * as moment from 'moment';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  listadoFincas: any[] = [];
  listadoLotesFinca: any[] = [];
  listadoVentas: any[] = [];
  showCard = false;
  currentDate: any;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private lotesService: LotesService,
    private fincasService: FincasService,
    private router: Router,
    private ventasService: VentasService
  ) { }

  ngOnInit() {
    this.formulario = this.crearFormulario();
    this.cargaParametricos();

    this.ventasService.updateVentas$.subscribe( data => {
      this.formulario.reset();
      this.showCard = false;
      this.listadoVentas = [];
    });
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  cargaParametricos() {
    this.fincasService.getFincas().subscribe( resp => {
      this.listadoFincas = resp;
    });

    this.fincasService.updateFincas$
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe( data => {
      this.fincasService.getFincas().subscribe( resp => {
        this.listadoFincas = resp;
      });
    });
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      fincas: new FormControl( '', [Validators.required] ),
      lote: new FormControl( '', [Validators.required] ),
      dateInit: new FormControl( '', [] ),
      dateEnd: new FormControl( '', [] ),
    });

    return formulario;
  }

  buscar(){

    const init = moment(this.formulario.controls.dateInit.value).format('YYYY-MM-DD') === 'Invalid date' ? '' : moment(this.formulario.controls.dateInit.value).format('YYYY-MM-DD');
    const end = moment(this.formulario.controls.dateEnd.value).format('YYYY-MM-DD') === 'Invalid date' ? '' : moment(this.formulario.controls.dateEnd.value).format('YYYY-MM-DD');

    console.log(init, end);
    
    this.ventasService.getVentas(
      this.formulario.controls.fincas.value,
      this.formulario.controls.lote.value,
      init,
      end
      ).pipe( map( (resp: any) => resp.data)).subscribe( (data: any) => {
        this.listadoVentas = data.data;
        console.log(data);
        this.showCard = true;
      });
  }

  changeFinca(event){
    this.lotesService.getLotes(event).subscribe((lotes: any) => {
      this.listadoLotesFinca = lotes;
    }, err => {
    });
  }

  changeLote(event){
  }

  submit(){
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
    } else {
      this.router.navigate([
        'dashboard/tabs/ventas/agregar-venta',
        { farmId: this.formulario.controls.fincas.value, lotId: this.formulario.controls.lote.value }
      ]);
    }

  }

 
}
