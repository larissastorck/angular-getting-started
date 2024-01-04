import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./components/welcome/welcome.component";


const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('src/app/components/product/product.module').then((m) => m.ProductModule)
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
