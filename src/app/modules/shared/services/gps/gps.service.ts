import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class GpsService {

  getGps(formulario: FormGroup) {
    formulario.controls?.ubication?.setValue(
      `${51.5285582}, ${-0.2416797}`
    );
  }
}
