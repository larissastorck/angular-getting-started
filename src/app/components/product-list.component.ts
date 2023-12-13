import { Component } from "@angular/core";
import { Product } from "../models/product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',

})
export class ProductListComponent {
  pageTitle: string = 'Product List';
  showImage: boolean = false;
  imageWidth = 40;
  imageMargin = 40;
  private _filterList = '';
  filteredProducts!: Product[];

  get filterList(): string {
    return this._filterList;
  }

  set filterList(value: string) {
    this._filterList = value;
    this.filteredProducts = this.performFilter(value);
  }


  products: Product[] = [{
    "productId": 1,
    "productName": "Leaf Rake",
    "productCode": "GDN-0011",
    "releaseDate": "March 19, 2019",
    "description": "Leaf rake with 48-inch wooden handle.",
    "price": 19.95,
    "starRating": 3.2,
    "imageUrl": "assets/images/leaf_rake.png"
  },
  {
    "productId": 2,
    "productName": "Garden Cart",
    "productCode": "GDN-0023",
    "releaseDate": "March 18, 2019",
    "description": "15 gallon capacity rolling garden cart",
    "price": 32.99,
    "starRating": 4.2,
    "imageUrl": "assets/images/garden_cart.png"
  }];

  performFilter(filterBy: string) {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: Product) => product.productName.toLowerCase().includes(filterBy))
  }

  toggleImage() {
    this.showImage = !this.showImage;
    console.log('toggled');
  }

  onRatingClicked(message: string) {
    this.pageTitle = 'Product List' + message;
  }

}
