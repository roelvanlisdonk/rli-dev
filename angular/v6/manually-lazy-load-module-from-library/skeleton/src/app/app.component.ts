import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, SystemJsNgModuleLoader, Injector, ViewChild, ViewContainerRef, NgModuleFactory, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarComponent } from './dynamic-routing/car/car.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'skeleton';

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(
    private loader: SystemJsNgModuleLoader,
    private inj: Injector,
    private router: Router
  ) { }

  ngOnInit() {


  }

  addDynamicRoute() {
    // this.router.config.unshift({ path: 'dynamic', component: CarComponent });

    //loadChildren: 'app/admin/admin.module#AdminModule'

    this.router.config.unshift({
      path: 'dynamic',
      loadChildren: './wrapper/wrapper.module#WrapperForTodoManualLazyModule'
    });

  }

  loadToDoTaskList() {
    this.loader.load('src/app/wrapper/wrapper.module#WrapperForTodoManualLazyModule').then((moduleFactory: NgModuleFactory<any>) => {
      const moduleRef = moduleFactory.create(this.inj);
      const entryComponent = (<any>moduleFactory.moduleType).entry;
      const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);
      this.container.clear();
      this.container.createComponent(compFactory);
    });
  }
}
