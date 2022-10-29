import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeActividadComponent } from './home-actividad.component';

describe('HomeActividadComponent', () => {
  let component: HomeActividadComponent;
  let fixture: ComponentFixture<HomeActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeActividadComponent ],
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
