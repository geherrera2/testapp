import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from "@ionic/angular";

import { CrearCostoActividadComponent } from "./crear-costo-actividad.component";

describe("CrearCostoActividadComponent", () => {
  let component: CrearCostoActividadComponent;
  let fixture: ComponentFixture<CrearCostoActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCostoActividadComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCostoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
