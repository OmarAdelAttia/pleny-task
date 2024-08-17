import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProductContainerComponent } from './product/components/product-container/product-container.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "home", component: ProductContainerComponent, canActivate: [authGuard] },
];
