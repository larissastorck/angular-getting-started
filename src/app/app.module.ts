import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import localePtBr from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ConvertToSpacesPipe } from './shared/pipes/covert-to-spaces.pipe';
import { StarComponent } from './shared/star/star.component';

registerLocaleData(localePtBr)

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ConvertToSpacesPipe,
    StarComponent,
    HttpClientModule,
    AppRoutingModule,
    WelcomeComponent,
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







