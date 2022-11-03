import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { IonicModule } from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { DetalleFincaComponent } from "./detalle-finca.component";

describe("DetalleFincaComponent", () => {
  let component: DetalleFincaComponent;
  let fixture: ComponentFixture<DetalleFincaComponent>;

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

    fixture = TestBed.createComponent(DetalleFincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
