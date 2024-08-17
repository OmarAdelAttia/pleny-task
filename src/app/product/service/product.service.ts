import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "https://dummyjson.com/products";

  private httpClient = inject(HttpClient);

  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$: Observable<number> = this.cartCountSubject.asObservable();

  addToCart(quantity: number = 1): void {
    const currentCount = this.cartCountSubject.value;
    this.cartCountSubject.next(currentCount + quantity);
  }

  getCartCount(): Observable<number> {
    return this.cartCount$;
  }

}
