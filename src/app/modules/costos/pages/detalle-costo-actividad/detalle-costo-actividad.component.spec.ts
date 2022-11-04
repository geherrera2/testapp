import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from "@ionic/angular";
import { AlertService } from "@shared/services/alert/alert.service";
import { CostosService } from "../../services/costos.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { DetalleCostoActividadComponent } from "./detalle-costo-actividad.component";
import { HttpClient } from "@angular/common/http";

describe("DetalleCostoActividadComponent", () => {
  let component: DetalleCostoActividadComponent;
  let fixture: ComponentFixture<DetalleCostoActividadComponent>;
  let httpClient: HttpClient;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleCostoActividadComponent],
      providers: [CostosService, AlertService],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(DetalleCostoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
