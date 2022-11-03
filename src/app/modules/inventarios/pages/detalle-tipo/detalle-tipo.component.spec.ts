import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { SearchPipe } from '@shared/pipes/search/search.pipe';
import { SharedModule } from '@shared/shared.module';

import { DetalleTipoComponent } from './detalle-tipo.component';

describe('DetalleTipoComponent', () => {
  let component: DetalleTipoComponent;
  let fixture: ComponentFixture<DetalleTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTipoComponent ],
      providers:[SearchPipe],
      imports: [IonicModule.forRoot(),RouterTestingModule,HttpClientTestingModule,SharedModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
