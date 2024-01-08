import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/product.model';
import { ProductService } from './product.service';


describe('ProductService', () => {
	let productService: ProductService;
	let httpTestingController: HttpTestingController;

	const mockProducts: Product[] = [
	{ id: 1, productName: 'Product 1', productCode: 'P1', releaseDate: '2022-01-01', description: 'Description 1', price: 100, starRating: 4, imageUrl: 'image1.jpg' },
	{ id: 2, productName: 'Product 2', productCode: 'P2', releaseDate: '2022-01-02', description: 'Description 2', price: 200, starRating: 3.5, imageUrl: 'image2.jpg' },
	];
  
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ProductService],
		});

		productService = TestBed.inject(ProductService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(productService).toBeTruthy();
	});

	it('should get products', () => {
		productService.getProducts().subscribe((products: Product[]) => {
			expect(products).toEqual(mockProducts);
		});
		const req = httpTestingController.expectOne('api/products/products.json');
		expect(req.request.method).toEqual('GET');
		req.flush(mockProducts);
	});


	it('should handle error when getting products', () => {
		productService.getProducts().subscribe({
			complete: () => fail('Expected an error'),
			error: (error) => {
					expect(error).toEqual('Ops, aconteceu alguma coisa')}
		});

		const req = httpTestingController.expectOne('api/products/products.json');
		req.flush(null, { status: 500, statusText: 'Internal Server Error' });
	});

	it('should get product by id', () => {
		const productId = 1;
		productService.getProduct(productId).subscribe((product: Product | undefined) => {
		expect(product).toEqual(mockProducts[0]);
		});
		const req = httpTestingController.expectOne('api/products/products.json');
		expect(req.request.method).toEqual('GET');
		req.flush(mockProducts);
	});


	it('should return undefined if product id is not found', () => {
		const productId = 3;
		productService.getProduct(productId).subscribe((product: Product | undefined) => {
		expect(product).toBeUndefined();
		});
		
		const req = httpTestingController.expectOne('api/products/products.json');
		expect(req.request.method).toEqual('GET');
		req.flush(mockProducts);
		});
	
	});