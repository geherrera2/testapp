import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    private httpService: HttpService
  ) { }

  getReporte = ( dataForm ) => this.httpService.post(`api/report/cost`, dataForm)
    .pipe(
      map( (resp: any) => {
        console.table(resp.data);
        
        let cosa: any[] = [];
        let tempCosa: any[] = [];
        let labels: any[] = [];
        let dataCost: any[] = [];
        cosa = resp.data;
        
        let total = 0;

        cosa.forEach( x => {
          let temp = 0;
          if ( x?.total ) {
            temp =  parseInt(x.total) ;
          }

          total += temp;
          console.log(total);
          
          if(x.tiype_activity_id){
            
            if (tempCosa[x.tiype_activity_id]){
              if ( x?.total ) {
                tempCosa[x.tiype_activity_id].total += x?.total ?? parseInt(x.total);
              }
            } else {
              tempCosa[x.tiype_activity_id] = {
                item: x.description,
                total: x?.total ? parseInt(x?.total) : 0,
                porcentaje: 0
              };
            }
          }

        });

        tempCosa.forEach( x => {
          x.porcentaje = (x.total * 100) / total;
          labels.push(x.item);
          dataCost.push(x.total);
        });



        return { tota: total, data: tempCosa, labels, dataCost};
      })
    )
}
