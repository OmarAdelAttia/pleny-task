import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectIsAuthenticated } from "./store/auth.selectors";
import { map } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(selectIsAuthenticated).pipe(
        map((isAuthenticated) => {
            if (isAuthenticated) {
                return true;
            } else {
                router.navigate(["/login"]);
                return false;
            }
        })
    );
};
