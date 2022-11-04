import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DetalleLoteComponent } from './detalle-lote.component';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

describe('DetalleLoteComponent', () => {
  let component: DetalleLoteComponent;
  let fixture: ComponentFixture<DetalleLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleLoteComponent ],
      providers: [
        { provide: Geolocation, useValue: {} },
        { provide: AndroidPermissions, useValue: {} }
       ],
      imports: [IonicModule.forRoot(),RouterTestingModule,HttpClientTestingModule,]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
