import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConvertToSpacesPipe } from 'src/app/shared/pipes/covert-to-spaces.pipe';
import { Product } from '../../models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { StarComponent } from '../../shared/star/star.component';
import { ProductListComponent } from './product-list.component';


describe('ProductListComponent', () => {
	let component: ProductListComponent;
	let fixture: ComponentFixture<ProductListComponent>;
	let productServiceSpy: jasmine.SpyObj<ProductService>;
	let mockProducts: Product[];
	
	beforeEach(() => {
		mockProducts = [
		{ id: 1, productName: 'Product 1', productCode: 'P1-36', releaseDate: '2022-01-01', price: 100, starRating: 3 },
		{ id: 2, productName: 'Product 2', productCode: 'P2-31', releaseDate: '2022-01-02', price: 200, starRating: 4 },
		];

		productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

		TestBed.configureTestingModule({
			declarations: [ProductListComponent],
			imports: [StarComponent, ConvertToSpacesPipe],
			providers: [{ provide: ProductService, useValue: productServiceSpy }],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	
		fixture = TestBed.createComponent(ProductListComponent);
		component = fixture.componentInstance;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});
  

	it('should initialize products on ngOnInit', () => {
		productServiceSpy.getProducts.and.returnValue(of(mockProducts));
		component.ngOnInit();
		expect(component.products).toEqual(mockProducts);
		expect(component.filteredProducts).toEqual(mockProducts);
	});


	it('should filter products based on filterList', () => {
		component.products = mockProducts;
		component.filterList = 'Product 1';
		expect(component.filteredProducts.length).toBe(1);
		expect(component.filteredProducts[0].productName).toBe('Product 1');
	});

	it('should toggle image visibility', () => {
		expect(component.showImage).toBeFalse();
		component.toggleImage();
		expect(component.showImage).toBeTrue();
	});
	
	it('should update pageTitle onRatingClicked', () => {
		const message = 'Test Message';
		component.onRatingClicked(message);
		expect(component.pageTitle).toBe('Product List' + message);
	});

	it('should log stars on ngAfterViewInit', () => {
		productServiceSpy.getProducts.and.returnValue(of(mockProducts));
		component.products = mockProducts;
		spyOn(console, 'log');
		fixture.detectChanges();
		component.ngAfterViewInit();
		expect(component.stars.length).toBe(2)
		expect(console.log).toHaveBeenCalledWith('stars ', component.stars);
	});
});