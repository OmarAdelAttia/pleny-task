import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/auth.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import { loginFailure, loginSuccess } from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "https://dummyjson.com/auth/login";

  private http = inject(HttpClient);
  private store = inject(Store<AuthState>);

  login(username: string, password: string, expiresInMins: number = 60): Observable<AuthResponse> {
    const body = { username, password, expiresInMins };
    return this.http.post<AuthResponse>(this.apiUrl, body);
  }

  performLogin(username: string, password: string, expiresInMins?: number): void {
    this.login(username, password, expiresInMins).subscribe({
      next: (response) => this.store.dispatch(loginSuccess({ authResponse: response })),
      error: (error) => this.store.dispatch(loginFailure({ error })),
    });
  }

}
