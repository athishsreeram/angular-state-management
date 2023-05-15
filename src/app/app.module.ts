import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/customer.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerViewComponent } from './customer/customer-view/customer-view.component';

@NgModule({
  declarations: [
    AppComponent,CustomerAddComponent,CustomerViewComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot( {demostore: reducer} ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
