import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../modules/session/services/session/session.service';


@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  canActivate() {
    console.log(this.sessionService.token);
    if (this.sessionService.token) {
      return true;
    } else {
      return false;
    }
  }

}
