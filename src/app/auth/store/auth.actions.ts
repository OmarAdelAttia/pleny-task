import { createAction, props } from "@ngrx/store";
import { AuthResponse } from "../model/auth.model";

export const login = createAction(
    "[Auth] Login",
    props<{ username: any; password: any; expiresInMins?: number }>()
);

export const loginSuccess = createAction(
    "[Auth] Login Success",
    props<{ authResponse: AuthResponse }>()
);

export const loginFailure = createAction(
    "[Auth] Login Failure",
    props<{ error: any }>()
);
