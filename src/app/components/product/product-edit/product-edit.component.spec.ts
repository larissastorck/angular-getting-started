import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductEditComponent } from './product-edit.component';

  

@Directive({
	selector: '[routerLink]',
	host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
	@Input('routerLink') linkParams: any;
	navigatedTo: any = null;
	
	onClick() {
	this.navigatedTo = this.linkParams
	}
}

  
describe('ProductEditComponent', () => {
	let component: ProductEditComponent;
	let fixture: ComponentFixture<ProductEditComponent>;
	let activatedRoute: ActivatedRoute;
	let productService: jasmine.SpyObj<ProductService>;
	let formBuilder: FormBuilder;

  

	beforeEach(() => {
		productService = jasmine.createSpyObj('ProductService', ['getProduct']);
		activatedRoute = { snapshot: { paramMap: { get: () => '1' } } } as any;
	
	  
	
		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule],
			declarations: [ProductEditComponent, RouterLinkDirectiveStub],
			providers: [
			{ provide: ActivatedRoute, useValue: activatedRoute },
			{ provide: ProductService, useValue: productService },
			FormBuilder,
			],
		}).compileComponents();
	
	
		fixture = TestBed.createComponent(ProductEditComponent);
		component = fixture.componentInstance;
		formBuilder = TestBed.inject(FormBuilder);
	  	
		// Mock product for testing
		productService.getProduct.and.returnValue(of({
		id: 1,
		productName: 'Product 1',
		productCode: 'P1',
		starRating: 4,
		description: 'Description 1',
		} as Product));
	fixture.detectChanges();
	});

  
	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

  
	it('should initialize product form on ngOnInit', () => {
		component.ngOnInit();
		expect(component.productForm instanceof FormGroup).toBeTrue();
	});

  

	it('should get product from ProductService on ngOnInit', () => {
		component.ngOnInit();
		expect(productService.getProduct).toHaveBeenCalledWith(1);
		expect(component.product).toEqual({
		id: 1,
		productName: 'Product 1',
		productCode: 'P1',
		starRating: 4,
		description: 'Description 1',
		} as Product);
	});

  

	it('should patch form values on displayProduct', () => {
		component.displayProduct({
		id: 1,
		productName: 'Updated Product',
		productCode: 'P1',
		starRating: 3,
		description: 'Updated Description',
		} as Product);
	
		expect(component.productForm.value).toEqual({
		productName: 'Updated Product',
		productCode: 'P1',
		starRating: 3,
		description: 'Updated Description',
		});
	});

  

	it('should save product on save if the form is valid', () => {
		component.ngOnInit(); // To populate the product and initialize the form
		const saveSpy = spyOn(console, 'log'); // Mocking the save action
		component.productForm.setValue({
		productName: 'Updated Product',
		productCode: 'P1',
		starRating: 3,
		description: 'Updated Description',
		});
		component.save();
	
		expect(saveSpy).toHaveBeenCalledWith('update product ', {
		id: 1,
		productName: 'Updated Product',
		productCode: 'P1',
		starRating: 3,
		description: 'Updated Description',
		});
	});


	it('should set error message on save if the form is invalid', () => {
		component.productForm.patchValue({
		productName: null,
		})
		component.save();
		expect(component.errMessage).toBe('There are errors, fix them');
	});

  

	it('should have required validators on productName', () => {
		const productNameControl = component.productName!;
		productNameControl.setValue('');
		expect(productNameControl.hasError('required')).toBe(true);
		productNameControl.setValue('Product Name');
		expect(productNameControl.valid).toBe(true);
	});


	it('should have range validators on starRating', () => {
		const starRatingControl = component.starRating!;
		starRatingControl.setValue(6);
		expect(starRatingControl.hasError('range')).toBe(true);
		starRatingControl.setValue(3);
		expect(starRatingControl.valid).toBe(true);
	});

});