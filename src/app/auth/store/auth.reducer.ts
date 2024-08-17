import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";
import { AuthResponse } from "../model/auth.model";

export interface AuthState {
    token: string | null;
    user: AuthResponse | null;
    error: any | null;
}

export const initialState: AuthState = {
    token: null,
    user: null,
    error: null,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, { authResponse }) => ({
        ...state,
        token: authResponse.token,
        user: authResponse,
        error: null,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
    }))
);
