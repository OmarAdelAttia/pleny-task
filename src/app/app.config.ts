import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { authReducer } from './auth/store/auth.reducer';
import { productReducer } from './product/store/product.reducer';
import { authInterceptor } from './auth/interceptor/auth.interceptor';
import { AuthEffects } from './auth/store/auth.effects';
import { ProductEffects } from './product/store/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      { eventCoalescing: true }
    ),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(
      { auth: authReducer, products: productReducer }
    ),
    provideEffects([AuthEffects, ProductEffects]),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideStoreDevtools(
      { maxAge: 25 }
    ),
  ]
};
