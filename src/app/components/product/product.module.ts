import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ConvertToSpacesPipe } from "src/app/shared/pipes/covert-to-spaces.pipe";
import { StarComponent } from "src/app/shared/star/star.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductListComponent } from "./product-list.component";
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
  declarations: [ProductListComponent, ProductEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    StarComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent,
    ProductRoutingModule,
    ReactiveFormsModule
    //InMemoryWebApiModule.forRoot(ProductData)
  ]
})
export class ProductModule {
}
