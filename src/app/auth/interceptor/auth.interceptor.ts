import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectAuthToken } from "../store/auth.selectors";
import { exhaustMap, finalize, take } from "rxjs";
import { LoaderService } from "../../shared/loader/service/loader.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const store = inject(Store);
    const loadingService = inject(LoaderService);

    loadingService.show();

    return store.select(selectAuthToken).pipe(
        take(1),
        exhaustMap((token) => {
            let authReq = req;
            if (token) {
                authReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            return next(authReq).pipe(finalize(() => loadingService.hide()));
        })
    );
};
