import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearInsumoComponent } from './crear-insumo.component';

describe('CrearInsumoComponent', () => {
  let component: CrearInsumoComponent;
  let fixture: ComponentFixture<CrearInsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearInsumoComponent ],
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close()', () => {
    component.close();
    expect(component).toBeTruthy();
  });

  it("Validate form : submit", function(doneFn){
    component.submit();
    doneFn();
  });
});
