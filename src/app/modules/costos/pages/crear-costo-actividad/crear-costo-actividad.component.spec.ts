import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from "@ionic/angular";
import { of } from "rxjs";
import { LotesService } from "src/app/modules/fincas/services/lotes/lotes.service";
import { CostosService } from "../../services/costos.service";

import { CrearCostoActividadComponent } from "./crear-costo-actividad.component";

describe("CrearCostoActividadComponent", () => {
  let component: CrearCostoActividadComponent;
  let fixture: ComponentFixture<CrearCostoActividadComponent>;
  let costosService: CostosService;
  let lotesService: LotesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCostoActividadComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
    costosService = TestBed.inject(CostosService);
    lotesService = TestBed.inject(LotesService);
    fixture = TestBed.createComponent(CrearCostoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Validate form : valida form", function(doneFn){
    const mockForm = {
      type_cost_id: '123',
      type_activity_id: '123',
      farm_id: '123',
      lot_id: '123',
      stage_id: '123',
      type_work_id: '123',
      amount: '123',
      unit_cost: '123',
      total_cost: '123',
      supplies: '123',
    }
    const mockResponse = {
        id: 'test',

    }

    
    component.formulario.setValue(mockForm);
    spyOn(costosService, 'crearCostoActividad').and.returnValue(of(mockResponse));
    component.submit();
    doneFn();
  });

  it("Validate form : invalid form", function(){
    component.submit();
  });

  it("changeFinca", function(doneFn){
    const mockResponse = {
        id: 'test',

    }
    
    spyOn(lotesService, 'getLotes').and.returnValue(of(mockResponse));
    component.changeFinca({});
    doneFn();
  });
});
