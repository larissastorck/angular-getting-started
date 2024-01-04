import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/shared/services/product.service";
import { StarComponent } from "src/app/shared/star/star.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  imports: [CommonModule, StarComponent, RouterModule]
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Product Detail '
  product!: Product;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.pageTitle = this.pageTitle + id
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product as Product
    })
  }

  onBack() {
    this.router.navigate(['/products'])
  }

}
