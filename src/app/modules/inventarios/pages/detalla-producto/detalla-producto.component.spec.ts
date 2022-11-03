import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { DetallaProductoComponent } from './detalla-producto.component';

describe('DetallaProductoComponent', () => {
  let component: DetallaProductoComponent;
  let fixture: ComponentFixture<DetallaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallaProductoComponent ],
      imports: [IonicModule.forRoot(),RouterTestingModule,HttpClientTestingModule,]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
