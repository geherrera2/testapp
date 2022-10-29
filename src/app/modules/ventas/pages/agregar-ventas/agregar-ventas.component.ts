import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../services/ventas/ventas.service';
import { AlertService } from '@shared/services/alert/alert.service';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-agregar-ventas',
  templateUrl: './agregar-ventas.component.html',
  styleUrls: ['./agregar-ventas.component.scss'],
})
export class AgregarVentasComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  farmId: any;
  lotId: any;
  currentDate: any;
  listaTipoVentaCafe: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private ventasService: VentasService,
    private alertService: AlertService,
    private navController: NavController
  ) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.farmId  = params.farmId;
      this.lotId  = params.lotId;
    });
    this.formulario = this.crearFormulario();
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');
    this.ventasService.getTipoVentasCafe().subscribe( (data: any) => {
      this.listaTipoVentaCafe = data?.data  ?? [];
    });
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      date: new FormControl( '', [Validators.required] ),
      farm_id: new FormControl( this.farmId , [Validators.required] ),
      lot_id: new FormControl( this.lotId, [Validators.required] ),
      amount_loads: new FormControl( '', [Validators.required] ),
      sale_value: new FormControl( '', [Validators.required] ),
      buyer: new FormControl( '', [] ),

      sales_type_coffee_id: new FormControl( '', [Validators.required] ),
      // kilos_coffee_prod: new FormControl( '', [Validators.required] ),
      kilos_coffee_des: new FormControl( '', [Validators.required] ),
      bonus: new FormControl( '', [Validators.required] ),
      sale_value_base: new FormControl( '', [Validators.required] ),
      bonus_other: new FormControl( '', [] ),
    });

    return formulario;
  }

  submit(){
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
    } else {
      if(this.formulario.controls.kilos_coffee_des.value > this.formulario.controls.amount_loads.value){
        this.alertService.presentAlert('Kilos de Café despachados o producidos no pueden ser mayor a los kilos producidos.', [
          {
            text: 'Aceptar',
            handler: () => {
              return;
            }
          }
        ], 'Registro creado');
        return;
      }
      // const cosa = moment(this.formulario.controls.date.value).format('YYYY-MM-DD');
      // this.formulario.controls.date.setValue();
      this.alertService.activarLoading(true);
      this.ventasService.crearVenta(this.formulario.getRawValue()).subscribe( data =>  {
        this.alertService.activarLoading(false);
        this.alertService.presentAlert('La venta se creó correctamente.', [

          {
            text: 'Aceptar',
            handler: () => {
              this.ventasService.eventoActualizarVentas(true);
              this.navController.back();
            }
          }
        ], 'Registro creado');
      }, error => {
        this.alertService.activarLoading(false);
        this.alertService.presentAlert('Se produjo un error en el registro de la finca', ['Aceptar']);
      });


      // this.router.navigate([
      //   'dashboard/tabs/ventas/agregar-venta',
      //   { farmId: this.formulario.controls.fincas.value, lotId: this.formulario.controls.lote.value }
      // ]);
    }
  }

}
