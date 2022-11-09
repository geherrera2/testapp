import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { CrearFincaModalComponent } from './crear-finca-modal.component';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ParametricasService } from '@shared/services/parametricas/parametricas.service';
import { of } from 'rxjs';

describe('CrearFincaModalComponent', () => {
  let component: CrearFincaModalComponent;
  let fixture: ComponentFixture<CrearFincaModalComponent>;
  let parametricasService: ParametricasService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearFincaModalComponent ],
      providers: [
        { provide: Geolocation, useValue: {} },
        { provide: AndroidPermissions, useValue: {} }
       ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
    parametricasService = TestBed.inject(ParametricasService)
    fixture = TestBed.createComponent(CrearFincaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Validate form : invalid form", function(doneFn){
    component.submit();
    doneFn();
  });

  it("Validate form : valida form", function(doneFn){
    const mockForm = {
      cadastral_record: '123',
      department_id: '123',
      municipality_id: '123',
      village_id: '123',
      name: '123',
      ubication: '123',
      total_area: '123',
      holding_id: '123',
    }

    component.formulario.setValue(mockForm);
    component.submit();
    
    doneFn();
  });

  it("changeDpto, whitout municipio", function(doneFn){
    spyOn(parametricasService, 'getMunicipiosPorDpto').and.returnValue(of({error:true}));
    component.changeDpto({});
    doneFn();
  });
});
