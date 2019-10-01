If you just want to unit test the code inside a component, then you might NOT want to load all the components used inside the components template.

So instead of importing all dependent modules, you can just declare the component inside the TestBed.configureTestingModule, mock the services needed by the component and you are done.

For example

```
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EntityAuditEventService } from './find.service';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [MyComponent],
      providers: [
        {
          provide: FindService,
          useValue: {
            find: () =>
              of({})
          }
        }
      ]
    })
      .overrideTemplate(MyComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});

```
