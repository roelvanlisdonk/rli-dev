import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualLazyModule, TaskListComponent } from 'todo';
import { Test } from './test.component';

    // ,    ManualLazyModule
@NgModule({
  imports: [
    CommonModule,
    ManualLazyModule
  ],
  declarations: [
    Test
  ]
})
export class WrapperForTodoManualLazyModule {
  static entry = TaskListComponent;
}
