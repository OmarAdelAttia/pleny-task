import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      {
        eventCoalescing: true
      }
    ),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(),
    provideEffects(),
    provideHttpClient(),
    provideStoreDevtools(
      {
        maxAge: 25
      }
    ),
  ]
};
