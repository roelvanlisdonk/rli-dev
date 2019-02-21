import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './dynamic-routing/car/car.component';
import { DynamicRoutingModule } from './dynamic-routing/dynamic-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicRoutingModule
  ],
  providers: [
    SystemJsNgModuleLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
