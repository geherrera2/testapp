import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FincasService } from "../../services/fincas/fincas.service";
import { LotesService } from "../../services/lotes/lotes.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ParametricasService } from "@shared/services/parametricas/parametricas.service";
import { FincasModel } from "../../models/fincas.model";
import { AlertService } from "../../../shared/services/alert/alert.service";
import { IonSlides, ModalController, NavController } from "@ionic/angular";
import { CrearLotesModalComponent } from "../../components/crear-lotes-modal/crear-lotes-modal.component";
import { ParametricasModel } from "@shared/models/parametricas.model";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GpsService } from "@shared/services/gps/gps.service";

@Component({
  selector: "app-detalle-finca",
  templateUrl: "./detalle-finca.component.html",
  styleUrls: ["./detalle-finca.component.scss"],
})
export class DetalleFincaComponent implements OnInit, OnDestroy {
  compareWith: any;
  formulario: FormGroup;
  mensajesFormulario: any = {};
  title = "";
  id = "";
  redirect;
  detalleFinca: FincasModel;
  textoDepartamento: string;
  textoMunicipio: string;
  textoVereda: string;
  textoTendencia: string;
  modal: any;
  segmentSeletcted = "detalle";
  ionSlides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 0,
  };

  parametricas: ParametricasModel;

  public destroy$: Subject<boolean> = new Subject<boolean>();
  public destroyIonSlides$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fincasService: FincasService,
    private lotesService: LotesService,
    private parametricasService: ParametricasService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    public modalController: ModalController,
    private navController: NavController,
    public gpsService: GpsService
  ) {
    this.route.params.subscribe((params) => {
      this.title = params.name;
      this.id = params.id;
      this.redirect = params.redirect;
    });
  }

  ngOnInit() {
    if (this.redirect && this.redirect === "crear") {
      interval(200)
        .pipe(takeUntil(this.destroyIonSlides$))
        .subscribe((data) => {
          if (this.ionSlides) {
            this.segmentSeletcted = "lotes";
            this.ionSlides.slideNext(100);
            this.destroyIonSlides$.next(true);
          }
        });
    }

    this.formulario = this.crearFormulario();
    this.parametricas = this.parametricasService.param;
    this.cargarDetalleFinca();
    this.lotesService.updateLotes$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.getLotes();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.destroyIonSlides$.unsubscribe();
  }

  cargarDetalleFinca() {
    this.alertService.activarLoading(true);
    this.fincasService
      .getDetalleFinca(this.id)
      .subscribe((resp: FincasModel) => {
        this.alertService.activarLoading(false);
        this.detalleFinca = resp;
        this.setFormulario(this.detalleFinca);
        this.getLotes();
      });
  }

  getLotes() {
    this.lotesService.getLotes(this.detalleFinca.id).subscribe(
      (lotes: any) => {
        this.detalleFinca.lotes = lotes;
      },
      (err) => {
        this.alertService.activarLoading(false);
      }
    );
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      id: new FormControl("", []),
      lotes: new FormControl("", []),
      cadastral_record: new FormControl("", []),
      department_id: new FormControl("", [Validators.required]),
      municipality_id: new FormControl("", [Validators.required]),
      village_id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      ubication: new FormControl("", []),
      total_area: new FormControl("", [Validators.required]),
      holding_id: new FormControl("", [Validators.required]),
    });
    this.mensajesFormulario = this.fincasService.mensajesFinca();
    return formulario;
  }

  private setFormulario(data: any) {
    this.formulario.controls.id.setValue(data?.id ?? "");
    this.formulario.controls.lotes.setValue(data?.lotes ?? "");
    this.formulario.controls.cadastral_record.setValue(
      data?.cadastral_record ?? ""
    );
    this.formulario.controls.department_id.setValue(data?.department_id ?? "");
    this.formulario.controls.municipality_id.setValue(
      data?.municipality_id ?? ""
    );
    this.formulario.controls.village_id.setValue(data?.village_id ?? "");
    this.formulario.controls.name.setValue(data?.name ?? "");
    this.formulario.controls.ubication.setValue(data?.ubication ?? "");
    this.formulario.controls.total_area.setValue(data?.total_area ?? "");
    this.formulario.controls.holding_id.setValue(data?.holding_id ?? "");
  }

  changeDpto(event: any, municipio = null) {
    this.textoDepartamento = null;
    this.parametricasService
      .getMunicipiosPorDpto(event)
      .subscribe((data: any) => {
        this.parametricas.municipalities = data.data;
        if (municipio) {
          const temp = this.parametricas?.municipalities?.find(
            (e) => e.id == municipio
          );
          this.textoMunicipio = temp?.name;

          this.changeMpio(municipio, this.detalleFinca?.village_id);
        }
      });
  }

  changeMpio(event: any, vereda = null) {
    this.textoMunicipio = null;
    this.parametricasService.getVeredasPorMpio(event).subscribe((data: any) => {
      this.parametricas.villages = data.data;
      if (vereda) {
        const temp = this.parametricas?.villages?.find((e) => e.id == vereda);
        this.textoVereda = temp?.name;
      }
    });
  }

  changeTenencia(event: any) {
    this.textoTendencia = null;
  }

  submit() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.fincasService
        .actualizarFinca(this.formulario.getRawValue())
        .subscribe(
          (data: any) => {
            
            this.fincasService.eventoActualizarFinca(data?.data);
            this.alertService.activarLoading(false);
            this.alertService.presentAlert(
              "La información se actualizó correctamente",
              [{ text: "Aceptar" }],
              "Registro actualizado"
            );
          },
          (error) => {
            this.alertService.activarLoading(false);
            this.alertService.presentAlert(
              "Se produjo un error en el registro de la finca, " +
                error.error.message,
              ["Aceptar"]
            );
          }
        );
    }
  }

  segmentChanged(ev: any) {
    this.segmentSeletcted = ev.detail.value;
    if (this.segmentSeletcted === "detalle") {
      this.ionSlides.slidePrev(100);
    } else {
      this.ionSlides.slideNext(100);
    }
  }

  slideDidChange(slides: IonSlides) {
    this.ionSlides = slides;
    this.ionSlides.getActiveIndex().then((data) => {
      if (data === 0) {
        this.segmentSeletcted = "detalle";
      } else {
        this.segmentSeletcted = "lotes";
      }
    });
  }

  slidesDidLoad(slides: IonSlides) {
    this.ionSlides = slides;
  }

  openDetailLot(item) {
    this.router.navigate([
      "dashboard/tabs/fincas/lote/detalle/" + item.id,
      {
        id: item.id,
        name: item.name,
        areaDisponible: this.detalleFinca?.available_area,
      },
    ]);
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: CrearLotesModalComponent,
      cssClass: "my-custom-class",
      componentProps: {
        idFinca: this.id,
        areaDisponible: this.detalleFinca.available_area,
      },
    });
    await this.modal.present();

    const { data } = await this.modal.onWillDismiss();
    if (data.datos) {
      this.cargarDetalleFinca();
      this.detalleFinca.lotes.push({
        id: data.datos.id,
        name: data.datos.name,
      });
    }
  }

  eliminar() {
    this.alertService.presentAlert(
      `¿Está seguro de eliminar la finca?`,
      [
        {
          text: "Cancelar",
          handler: () => {},
        },
        {
          text: "Aceptar",
          handler: () => {
            this.alertService.activarLoading(true);
            this.fincasService.eliminarFinca(this.id).subscribe(
              (data) => {
                this.alertService.activarLoading(false);
                this.fincasService.eventoActualizarFinca(null);
                this.navController.back();
                this.alertService.presentToast("La finca fue eliminada.");
              },
              (err) => {
                this.alertService.activarLoading(false);
              }
            );
          },
        },
      ],
      "Atención"
    );
  }

  getGps = () => this.gpsService.getGps(this.formulario);
  
}
