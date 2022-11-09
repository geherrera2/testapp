import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-finca-formulario',
  templateUrl: './finca-formulario.component.html',
  styleUrls: ['./finca-formulario.component.scss'],
})
export class FincaFormularioComponent {

  @Input() formulario:FormGroup;
  @Input() currentDate:any;
  @Input() mensajesFormulario:any;

  @Output() submitEvent = new EventEmitter<boolean>();
  @Output() eliminarEvent = new EventEmitter<boolean>();

  eliminar(){
    this.eliminarEvent.emit(true);
  }

  submit(){
    this.submitEvent.emit(true)
  }

}
