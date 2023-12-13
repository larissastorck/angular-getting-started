import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';

import localePtBr from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from 'src/app/components/product-list.component';
import { AppComponent } from './app.component';
import { ConvertToSpacesPipe } from './shared/pipes/covert-to-spaces.pipe';
import { StarComponent } from './shared/star/star.component';

registerLocaleData(localePtBr)

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ConvertToSpacesPipe,
    StarComponent
  ],
  providers: [{
    provide: LOCALE_ID, useValue: 'pt-Br'
  },
  {
    provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }







