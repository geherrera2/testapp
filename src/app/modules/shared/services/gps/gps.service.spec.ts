import { TestBed } from '@angular/core/testing';
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";

import { GpsService } from './gps.service';

describe('GpsService', () => {
  let service: GpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Geolocation, useValue: {} },
        { provide: AndroidPermissions, useValue: {} }
       ],
    });
    service = TestBed.inject(GpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
