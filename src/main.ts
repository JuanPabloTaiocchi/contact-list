import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { makeServer } from './mirage/server';

if (environment.production) {
  enableProdMode();
}
/**
 * Mocking server if in develop mode
 */
if (!environment.production) {
  makeServer({ environment: "development" })
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
