import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { CrearFincaModalComponent } from './crear-finca-modal.component';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

describe('CrearFincaModalComponent', () => {
  let component: CrearFincaModalComponent;
  let fixture: ComponentFixture<CrearFincaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearFincaModalComponent ],
      providers: [
        { provide: Geolocation, useValue: {} },
        { provide: AndroidPermissions, useValue: {} }
       ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearFincaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
