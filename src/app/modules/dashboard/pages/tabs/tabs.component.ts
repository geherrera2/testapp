import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  lista =  [
    { tab: 'fincas', nombre: 'Finca' , img: 'finca.png', currentImg: 'finca.png'},
    { tab: 'ventas', nombre: 'Ventas' , img: 'ventas.png', currentImg: 'finca.png'},
    { tab: 'costos', nombre: 'Costos' , img: 'costos.png', currentImg: 'finca.png'},
    { tab: 'inventario', nombre: 'Inventario' , img: 'inventario.png', currentImg: 'finca.png'},
    { tab: 'reportes', nombre: 'Reporte y análisis' , img: 'analisis.png', currentImg: 'finca.png'}
  ];

  tabActual: string;

  constructor() { }

  ngOnInit() {}

  setCurrentTab(data){
    this.tabActual = data.tag;
  }

}
