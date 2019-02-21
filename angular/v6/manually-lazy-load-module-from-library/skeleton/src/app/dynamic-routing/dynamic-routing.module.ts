import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car/car.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CarComponent],
  entryComponents: [CarComponent],
  exports:[CarComponent]
})
export class DynamicRoutingModule { }
