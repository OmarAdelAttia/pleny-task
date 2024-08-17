import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (authState) => !!authState.token
);

export const selectAuthToken = createSelector(
    selectAuthState,
    (authState) => authState.token
);

export const selectAuthUser = createSelector(
    selectAuthState,
    (authState) => authState.user
);
export const selectAuthError = createSelector(
    selectAuthState,
    (authState) => authState.error
);
