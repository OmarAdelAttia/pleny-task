import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { setSearchQuery } from '../../product/store/product.actions';
import { selectIsAuthenticated } from '../../auth/store/auth.selectors';
import { ProductService } from '../../product/service/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private store = inject(Store);
  private productSrv = inject(ProductService);

  isAuthenticated$!: Observable<boolean>;
  cartItems = 0;

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement?.value || "";
    this.store.dispatch(setSearchQuery({ query }));
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.productSrv.cartCount$.subscribe((count) => {
      this.cartItems = count;
    });
  }

}
