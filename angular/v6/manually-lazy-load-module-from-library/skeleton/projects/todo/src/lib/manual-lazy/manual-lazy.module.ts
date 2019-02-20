import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TaskListComponent
  ],
  entryComponents: [TaskListComponent]
})
export class ManualLazyModule {
  static entry = TaskListComponent;
}
