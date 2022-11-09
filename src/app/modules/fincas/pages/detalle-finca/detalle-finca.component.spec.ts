import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  async,
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import {
  IonicModule,
  IonSlides,
} from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";

import { DetalleFincaComponent } from "./detalle-finca.component";
import { FincasService } from "../../services/fincas/fincas.service";
import { of, throwError } from "rxjs";
import { FincasModel } from "../../models/fincas.model";
import { LotesService } from "../../services/lotes/lotes.service";
import { ParametricasService } from "@shared/services/parametricas/parametricas.service";
import { AlertService } from "@shared/services/alert/alert.service";

describe("DetalleFincaComponent", () => {
  let component: DetalleFincaComponent;
  let fixture: ComponentFixture<DetalleFincaComponent>;
  let fincasService: FincasService;
  let lotesService: LotesService;
  let parametricasService: ParametricasService;
  let alertService: AlertService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleFincaComponent],
      providers: [
        { provide: Geolocation, useValue: {} },
        { provide: AndroidPermissions, useValue: {} },
        { provide: IonSlides, useValue: {} },
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fincasService = TestBed.inject(FincasService);
    lotesService = TestBed.inject(LotesService);
    alertService = TestBed.inject(AlertService);
    parametricasService = TestBed.inject(ParametricasService);
    fixture = TestBed.createComponent(DetalleFincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Validate segment", () => {
    component.ngOnInit();
    expect(component.segmentSeletcted).toEqual("detalle");
  });

  it("Validate redirect", () => {
    component.redirect = "crear";
    component.ngOnInit();
    expect(component.segmentSeletcted).toEqual("lotes");
  });

  it("cargarDetalleFinca", function (doneFn) {
    const mockResponse: FincasModel = new FincasModel({ id: 1 });
    spyOn(fincasService, "getDetalleFinca").and.returnValue(of(mockResponse));
    component.cargarDetalleFinca();
    doneFn();
  });

  it("getLotes", function (doneFn) {
    const mockResponse: FincasModel = new FincasModel({ id: 1 });
    component.detalleFinca = mockResponse;
    spyOn(lotesService, "getLotes").and.returnValue(of(mockResponse));
    component.getLotes();
    doneFn();
  });

  it("getLotes: error", function (doneFn) {
    const mockResponse: FincasModel = new FincasModel({ id: 1 });
    component.detalleFinca = mockResponse;
    spyOn(lotesService, "getLotes").and.returnValue(throwError({ erro: true }));
    component.getLotes();
    doneFn();
  });

  it("Validate form : invalid form", function (doneFn) {
    component.submit();
    doneFn();
  });

  it("Validate form : valida form", function (doneFn) {
    const mockForm = {
      id: "test",
      lotes: "test",
      cadastral_record: "test",
      department_id: "test",
      municipality_id: "test",
      village_id: "test",
      name: "test",
      ubication: "test",
      total_area: "test",
      holding_id: "test",
    };

    const mockResponse = {
      data: {
        id: "test",
        cadastral_record: "test",
        department_id: "test",
        municipality_id: "test",
        village_id: "test",
        name: "test",
        ubication: "test",
        total_area: "test",
        holding_id: "test",
        department: "test",
        municipality: "test",
        village: "test",
        holding: "test",
        lotes: [],
        available_area: "test",
      },
    };
    component.formulario.setValue(mockForm);
    spyOn(fincasService, "actualizarFinca").and.returnValue(of(mockResponse));
    spyOn(fincasService, "eventoActualizarFinca");
    spyOn(alertService, "activarLoading");
    component.submit();

    expect(component.formulario.controls["lotes"].value).toEqual(
      mockForm.lotes
    );
    doneFn();
  });

  it("Validate form : valida form error response", function (doneFn) {
    const mockForm = {
      id: "test",
      lotes: "test",
      cadastral_record: "test",
      department_id: "test",
      municipality_id: "test",
      village_id: "test",
      name: "test",
      ubication: "test",
      total_area: "test",
      holding_id: "test",
    };

    const mockResponse = {
      data: {
        id: "test",
        cadastral_record: "test",
        department_id: "test",
        municipality_id: "test",
        village_id: "test",
        name: "test",
        ubication: "test",
        total_area: "test",
        holding_id: "test",
        department: "test",
        municipality: "test",
        village: "test",
        holding: "test",
        lotes: [],
        available_area: "test",
      },
    };
    component.formulario.setValue(mockForm);
    spyOn(fincasService, "actualizarFinca").and.returnValue(
      throwError({ error: true })
    );
    spyOn(fincasService, "eventoActualizarFinca");
    spyOn(alertService, "activarLoading");
    component.submit();

    expect(component.formulario.controls["lotes"].value).toEqual(
      mockForm.lotes
    );
    doneFn();
  });

  it("changeDpto, whitout municipio", function (doneFn) {
    spyOn(parametricasService, "getMunicipiosPorDpto").and.returnValue(
      of({ error: true })
    );
    component.changeDpto({});
    doneFn();
  });

  it("changeDpto, whit municipio", function (doneFn) {
    this.parametricas = parametricasService.param;
    spyOn(parametricasService, "getMunicipiosPorDpto").and.returnValue(
      of({ error: true })
    );
    component.changeDpto({}, "vcio");
    doneFn();
  });

  it("changeMpio, whitout vereda", function (doneFn) {
    spyOn(parametricasService, "getVeredasPorMpio").and.returnValue(
      of({ error: true })
    );
    component.changeMpio({});
    doneFn();
  });
  it("changeMpio, whit vereda", function (doneFn) {
    spyOn(parametricasService, "getVeredasPorMpio").and.returnValue(
      of({ error: true })
    );
    component.changeMpio({}, "vereda");
    doneFn();
  });
  it("changeTenencia", function (doneFn) {
    component.changeTenencia({});
    doneFn();
  });
  
  it("openDetailLot", function (doneFn) {
    component.openDetailLot({});
    doneFn();
  });

  it("getGps", function () {
    component.getGps();
  });

});

