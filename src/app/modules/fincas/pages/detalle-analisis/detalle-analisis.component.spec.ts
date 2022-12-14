import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleAnalisisComponent } from './detalle-analisis.component';

describe('DetalleAnalisisComponent', () => {
  let component: DetalleAnalisisComponent;
  let fixture: ComponentFixture<DetalleAnalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAnalisisComponent ],
      imports: [IonicModule.forRoot(),RouterTestingModule,HttpClientTestingModule,]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
