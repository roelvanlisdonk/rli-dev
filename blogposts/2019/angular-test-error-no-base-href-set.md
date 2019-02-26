
When running a ng test with Angular v6.2.9 cli, I was getting the error:

Error: No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.

This was fixed by adding the RouterTestingModule tot the TestBed TestingModule:

```TypeScript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

```

