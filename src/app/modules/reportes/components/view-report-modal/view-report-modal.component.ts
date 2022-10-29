import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-view-report-modal',
  templateUrl: './view-report-modal.component.html',
  styleUrls: ['./view-report-modal.component.scss'],
})
export class ViewReportModalComponent implements OnInit,AfterViewInit {

  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  doughnutChart: any;

  dataResult;

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log(this.dataResult);
    
  }

  close(){
    this.modalController.dismiss({datos: null});
  }

  ngAfterViewInit() {
    this.doughnutChartMethod(this.dataResult);
  }

  doughnutChartMethod(datos) {
    const transparencia = '0.7';
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: datos.labels,
        datasets: [{
          label: '',
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
      },
      options: {
        cutoutPercentage: 2,
        animation: {
          animateRotate : true
        }
      }
    });
  }

}
