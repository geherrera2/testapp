import { Component, OnInit } from '@angular/core';
import { DasboardService } from '../../services/dasboard/dasboard.service';
import { PopoverService } from '@shared/services/popover/popover.service';
import { environment } from 'src/environments/environment';

const VERSION = environment.version;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  version = '';
  lista =  [
    { tab: 'fincas', nombre: 'Finca' , img: 'finca.png'},
    { tab: 'ventas', nombre: 'Ventas' , img: 'ventas.png'},
    { tab: 'costos', nombre: 'Costos' , img: 'costos.png'},
    { tab: 'inventario', nombre: 'Inventario' , img: 'inventario.png'},
    { tab: 'reportes', nombre: 'Reporte y análisis' , img: 'analisis.png'}
  ];

  constructor(
    private dasboardService: DasboardService,
    public popoverService: PopoverService
  ) {

   }

  ngOnInit() {
    this.version = environment.version;
    this.dasboardService.prueba();
  }

}
