import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { productDetailGuard } from "./product-detail/product-detail.guard";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductListComponent } from "./product-list.component";

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id/edit', component: ProductEditComponent
  },
  {
    path: ':id', component: ProductDetailComponent,
    canActivate: [productDetailGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {

}
