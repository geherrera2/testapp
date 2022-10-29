import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportesService } from '../../services/reportes/reportes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FincasService } from 'src/app/modules/fincas/services/fincas/fincas.service';
import { Subject } from 'rxjs';
import { LotesService } from '../../../fincas/services/lotes/lotes.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import * as moment from 'moment';
import { ViewReportModalComponent } from '../../components/view-report-modal/view-report-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  formulario: FormGroup;
  listadoFincas: any[] = [];
  listadoLotesFinca: any[] = [];
  mensajesFormulario: any = {};
  currentDate: any;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private reportesService: ReportesService,
    private fincasService: FincasService,
    private lotesService: LotesService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.formulario = this.crearFormulario();
    this.cargaParametricos();  
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');  
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      fincas: new FormControl( '', [Validators.required] ),
      lote: new FormControl( '', [Validators.required] ),
      dateInit: new FormControl( '', [] ),
      dateEnd: new FormControl( '', [] ),
    });

    return formulario;
  }

  cargaParametricos() {
    this.fincasService.getFincas().subscribe( resp => {
      this.listadoFincas = resp;
    });

    this.fincasService.updateFincas$
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe( data => {
      this.fincasService.getFincas().subscribe( resp => {
        this.listadoFincas = resp;
      });
    });
  }

  changeFinca(event){
    this.lotesService.getLotes(event).subscribe((lotes: any) => {
      this.listadoLotesFinca = lotes;
    }, err => {
    });
  }

  changeLote(event){
  }
  

  doughnutChartMethod(datos) {
    const transparencia = '0.7';
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: datos.labels,
        datasets: [{
          label: '# of Votes',
          data: datos.dataCost,
          backgroundColor: [
            `rgba(255, 99, 132, ${transparencia})`,
            `rgba(54, 162, 235, ${transparencia})`,
            `rgba(255, 159, 64, ${transparencia})`,
            `rgba(181, 52, 24, ${transparencia})`,
            `rgba(33, 24, 181, ${transparencia})`,
            `rgba(164, 24, 181, ${transparencia})`,
            `rgba(24, 24, 181, ${transparencia})`,
            `rgba(24, 181, 150, ${transparencia})`,
            `rgba(181, 24, 24, ${transparencia})`,
            `rgba(181, 117, 24, ${transparencia})`,
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
          ]
        }]
      }
    });
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  submit(){
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
    } else {
     
      this.reportesService.getReporte({
        "type_cost_id" : 1,
        "farm_id" : this.formulario.controls.fincas.value,
        "lot_id" : this.formulario.controls.lote.value,
        "initial_date": this.formulario.controls.dateInit.value,
        "final_date": this.formulario.controls.dateEnd.value
      }).subscribe(data => {
        // this.doughnutChartMethod(data);
        // console.log(data);
        this.presentModal(data);
      });
    }

  }

  async presentModal(dataResult) {
    const modal = await this.modalController.create({
      component: ViewReportModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        dataResult
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.datos) {
     
    }
  }


}
