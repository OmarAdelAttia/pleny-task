import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.actions"; // Adjust the path as needed
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../service/auth.service";
import { AuthResponse } from "../model/auth.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

    private router = inject(Router);
    private actions$ = inject(Actions);
    private authSrv = inject(AuthService);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap((action) => this.authSrv.login(action.username, action.password, action.expiresInMins)
                .pipe(
                    map(
                        (authResponse: AuthResponse) =>
                            AuthActions.loginSuccess({ authResponse })
                    ),
                    tap(
                        () => this.router.navigate(["/home"])
                    ),
                    catchError(
                        (error) => of(AuthActions.loginFailure({ error }))
                    )
                )
            )
        )
    );
}
