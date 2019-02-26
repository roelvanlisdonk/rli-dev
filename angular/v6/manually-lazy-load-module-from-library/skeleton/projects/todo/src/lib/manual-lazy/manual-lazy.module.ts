import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { CustomersRoutingModule } from './routing.module';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  declarations: [
    TaskListComponent
  ],
  entryComponents: [TaskListComponent],
  exports: [TaskListComponent]
})
export class ManualLazyModule {
  static entry = TaskListComponent;
  constructor() {
    console.log("ManualLazyModule constructor!!");
  }
}

