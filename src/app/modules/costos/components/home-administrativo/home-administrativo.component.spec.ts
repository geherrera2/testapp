import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { HomeAdministrativoComponent } from './home-administrativo.component';

describe('HomeAdministrativoComponent', () => {
  let component: HomeAdministrativoComponent;
  let fixture: ComponentFixture<HomeAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAdministrativoComponent ],
      imports: [IonicModule.forRoot(),RouterTestingModule,HttpClientTestingModule,]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
