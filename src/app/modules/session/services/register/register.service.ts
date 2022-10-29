import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpService
  ) { }

  registroUsuario( dataForm: any ) {

    const data = {
      document_type: 'Cédula de ciudadanía',
      document_type_id: dataForm.tipoDocumento,
      email: dataForm.email,
      password: dataForm.clave,
      number: dataForm.numeroDocumento,
      celphone: dataForm.celular,
      therms_and_conditions: dataForm.terminos,
      name : dataForm.nombres,
      last_name: dataForm.apellidos
    };
    return this.http.post('api/register', data);
  }

  resetPassword  = (data) => this.http.post('api/forgot', data);

}
