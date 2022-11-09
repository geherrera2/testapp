import { Injectable } from "@angular/core";
import { AlertService } from "../alert/alert.service";
import { FormGroup } from "@angular/forms";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Injectable({
  providedIn: "root",
})
export class GpsService {
  constructor(
    private androidPermissions: AndroidPermissions,
    private alertService: AlertService,
    private geolocation: Geolocation
  ) {}

  getGps(formulario: FormGroup) {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        (data) => {
          if (data.hasPermission) {
            this.getUbicacion(formulario);
          } else {
            this.androidPermissions
              .requestPermissions([
                this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
                this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
              ])
              .then((respGps) => {
                if (respGps.hasPermission) {
                  this.getUbicacion(formulario);
                } else {
                  this.errorGps();
                }
              });
          }
        },
        (err) => {
          this.errorGps(err, formulario);
        }
      );
  }

  private getUbicacion(formulario: FormGroup) {
    this.alertService.activarLoading(true);
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.alertService.activarLoading(false);
        formulario.controls.ubication.setValue(
          `${resp.coords.latitude}, ${resp.coords.longitude}`
        );
      })
      .catch((error) => {
        this.errorGps(error, formulario);
      });
  }

  private errorGps(error?: any, form?: any) {
    this.alertService.activarLoading(false);
    let msg = "";
    if (error?.code === 2) {
      msg = "la aplicación no tiene suficientes permisos de geolocalización";
    } else {
      msg = "No fue posible capturar la geolocalización";
    }
    form.controls.ubication.setValue(`--`);
    this.alertService.presentAlert(msg, ["Aceptar"]);
  }
}
