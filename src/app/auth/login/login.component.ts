import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../store/auth.reducer';
import { selectAuthError } from '../store/auth.selectors';
import { login } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(
      '', Validators.required
    ),
    password: new FormControl(
      '', Validators.required
    ),
  });
  errorMessage: string | null = null;
  authError$: Observable<string | null>;

  private store = inject(Store<AuthState>);

  constructor() {
    this.authError$ = this.store.select(selectAuthError);
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.store.dispatch(login({ username, password }));
    this.authError$.subscribe((error) => {
      if (error) {
        this.errorMessage = (error as any).error.message;
      }
    });
  }
}
