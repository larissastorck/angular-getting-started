import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { NumberValidators } from 'src/app/shared/validators/number.validator';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {


  pageTitle = '';

  productForm!: FormGroup
  product!: Product
  errMessage = ''

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.initForm();
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.getProduct(id)
  }


  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (product) => this.displayProduct(product!)
    })
  }

  initForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productCode: [''],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ['']
    })
  }


  displayProduct(product: Product) {
    this.product = product;
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    })
  }


  get productName() {
    return this.productForm.get('productName')
  }

  get starRating() {
    return this.productForm.get('starRating')
  }

  save() {
    if (this.productForm.valid) {
      const p = { ...this.product, ...this.productForm.value } as Product;
      console.log('update product ', p);
    } else {
      this.errMessage = 'There are errors, fix them'
    }
  }
}
