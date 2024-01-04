import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { Product } from "../../models/product.model";
import { ProductService } from "../../shared/services/product.service";
import { StarComponent } from "../../shared/star/star.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',

})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';
  showImage: boolean = false;
  imageWidth = 40;
  imageMargin = 40;
  private _filterList = '';
  filteredProducts: Product[] = [];

  @ViewChild(StarComponent)
  starComponent!: StarComponent;

  @ViewChild('filterTitle')
  filterTitleEl!: ElementRef;

  @ViewChildren(StarComponent)
  stars!: QueryList<StarComponent>

  constructor(private productService: ProductService) {

  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = this.products;
      },
      error: (error) => {
        alert(error)
      },
      complete: () => {
        console.log('completed')
      }
    })

  }

  ngAfterViewInit(): void {
    console.log('filterTitleEl ', this.filterTitleEl.nativeElement.style.color = 'red');
    console.log('stars ', this.stars);
  }

  get filterList(): string {
    return this._filterList;
  }

  set filterList(value: string) {
    this._filterList = value;
    this.filteredProducts = this.performFilter(value);
  }


  products: Product[] = []

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
