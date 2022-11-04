import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { IonicModule } from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { DetalleFincaComponent } from "./detalle-finca.component";
import { FincasService } from "../../services/fincas/fincas.service";
import { of, throwError } from "rxjs";
import { FincasModel } from "../../models/fincas.model";
import { LotesService } from "../../services/lotes/lotes.service";

describe("DetalleFincaComponent", () => {
  let component: DetalleFincaComponent;
  let fixture: ComponentFixture<DetalleFincaComponent>;
  let fincasService: FincasService
  let lotesService: LotesService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleFincaComponent],
      providers: [
        { provide: Geolocation, useValue: {} },
        { provide: AndroidPermissions, useValue: {} }
       ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fincasService = TestBed.inject(FincasService);
    lotesService = TestBed.inject(LotesService);
    fixture = TestBed.createComponent(DetalleFincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Validate segment", () => {
    component.ngOnInit()
    expect(component.segmentSeletcted).toEqual('detalle');
  });

  it("Validate redirect", fakeAsync(() => {
    component.redirect = 'crear';
    expect(component.segmentSeletcted).toEqual('detalle');
    fixture.detectChanges();
    component.ngOnInit();
    tick(300);
    // component.ionSlides = k;
    expect(component.segmentSeletcted).toEqual('detalle');
    discardPeriodicTasks();
  }));

  it("cargarDetalleFinca", function(doneFn){
    const mockResponse:FincasModel = new FincasModel({id:1});
    spyOn(fincasService, 'getDetalleFinca').and.returnValue(of(mockResponse));
    component.cargarDetalleFinca();
    doneFn();
  });

  it("getLotes", function(doneFn){
    const mockResponse:FincasModel = new FincasModel({id:1});
    component.detalleFinca = mockResponse;
    spyOn(lotesService, 'getLotes').and.returnValue(of(mockResponse));
    component.getLotes();
    doneFn();
  });

  it("getLotes: error", function(doneFn){
    const mockResponse:FincasModel = new FincasModel({id:1});
    component.detalleFinca = mockResponse;
    spyOn(lotesService, 'getLotes').and.returnValue(throwError({ error: true }));
    component.getLotes();
    doneFn();
  });


  it("Validate form : submit", function(doneFn){
    component.submit();
    doneFn();
  });

  
});
