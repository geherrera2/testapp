
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "@shared/shared.module";
import { InventarioService } from "../../services/inventario/inventario.service";


import { ProductosComponent } from "./productos.component";

describe("ProductosComponent", () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let inventarioService: InventarioService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
      ],
    }).compileComponents();

    inventarioService = TestBed.inject(InventarioService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // it("should make an API call", () => {
  //   const mockResponse = [
  //     {
  //       id: 1,
  //       title: "Simons Product",
  //       price: 42.99,
  //       description: "Epic product test",
  //     },
  //   ];
  //   const arr = {};
  //   const spy = spyOn(inventarioService, 'getProductos').and.returnValue(
  //     Promise.resolve(arr)
  //   );

  //   inventarioService.getProductos().subscribe((res) => {
  //     expect(res).toBeTruthy();
  //     const product = res[0];
  //     expect(product).toBe(mockResponse[0]);
  //   });

  //   const mockRequest = httpTestingController.expectOne(
  //     "https://fakestoreapi.com/products"
  //   );

  //   expect(mockRequest.request.method).toEqual("GET");

  //   // Resolve with our mock data
  //   mockRequest.flush(mockResponse);
  // });
});
