import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { IonicModule, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockBackButton {
  subscribeWithPriority: jasmine.Spy<any>;
}

class MockPlatform {
  ready: jasmine.Spy<any>;
  backButton: any;
}

describe('AppComponent', () => {

  let statusBarSpy;
  let splashScreenSpy;
  let platformReadySpy;
  let mockPlatform;
  let mockBackButton;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    const platformReadySpy = jasmine.createSpy().and.returnValue(Promise.resolve());
    
    mockBackButton = new MockBackButton();
    mockBackButton.subscribeWithPriority = jasmine.createSpy('subscribeWithPriority', (priority, fn) => {});
    mockBackButton.statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    mockBackButton.splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    
    mockPlatform = new MockPlatform();
    mockPlatform.ready = platformReadySpy;
    mockPlatform.backButton = mockBackButton;

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: mockPlatform },
        { provide: SplashScreen, useValue: mockPlatform },
        { provide: Platform, useValue: mockPlatform },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(mockPlatform.ready).toHaveBeenCalled();
    await platformReadySpy;
  });

  // more tests...

});