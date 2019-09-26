1. There should only be ONE TranslateModule.forRoot inside the application, probably inside app.module.ts

# en.json

Inside '/src/assets/i18n/en.json

```
{
    "home": {
    "title": "My title"
    }
}
```

# app.component.html

```
<div>
  {{ 'home.title' | translate }}
</div>
<hr />
<router-outlet></router-outlet>
```

# app.modules.ts

```
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
declarations: [AppComponent],
imports: [
BrowserModule,
AppRoutingModule,
HttpClientModule,
TranslateModule.forRoot({
loader: {
provide: TranslateLoader,
useFactory: HttpLoaderFactory,
deps: [HttpClient]
}
})
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private readonly translate: TranslateService) {
        this.translate.addLangs(['en']);
        this.translate.setDefaultLang('en');
    }
}
```

# Within lazy load module ONCE TranslateModule.forChild and make sure you set isolate: true

```
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '-lazy.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  exports: [TranslateModule]
})
export class LazyTranslateModule {
  constructor(private readonly translate: TranslateService) {
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
  }
}
```

# lazy.module.ts

The following module should be lazy loaded:

```
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LazyPlaceComponent } from '../lazy-place/lazy-place.component';
import { LazyRoutingModule } from './lazy-routing.module';
import { LazyTranslateModule } from './lazy-translate.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '-lazy.json');
}

@NgModule({
  declarations: [LazyPlaceComponent],
  imports: [CommonModule, LazyRoutingModule, LazyTranslateModule]
})
export class LazyModule {}
```

# en-lazy.json

Inside '/src/assets/i18n/en-lazy.json

```
{
    "lazy": {
    "title": "My lazy title"
    }
}
```

# lazy.component.ts

```
<div>{{ 'lazy.title' | translate }}</div>
```

If you lazy load an other module (lets say: deep.module.ts), inside the lazy loaded module and don't want to start an new TranslationService, only import the TranslationModule from ngx-translate, inside the deeper.module.ts.

# angular.json

```
{
  ...
  "projects": {
    "myLazy": {
      ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            ...
            "assets": ["src/favicon.ico", "src/assets"],
```

Note I checked this on a Angular 8 app with ivy enabled.
