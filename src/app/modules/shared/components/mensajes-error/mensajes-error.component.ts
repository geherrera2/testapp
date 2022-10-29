import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-mensajes-error',
  templateUrl: './mensajes-error.component.html',
  styleUrls: ['./mensajes-error.component.scss'],
})
export class MensajesErrorComponent implements OnInit {

  @Input() mensajes: any[];
  @Input() control: AbstractControl;

  constructor() { }

  ngOnInit() {}

}
