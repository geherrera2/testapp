import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-clear',
  templateUrl: './input-clear.component.html',
  styleUrls: ['./input-clear.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputClearComponent implements OnInit {

  @Input() control: AbstractControl;

  constructor() { }

  ngOnInit() {}

  clear(){
    this.control.reset();
  }

}
