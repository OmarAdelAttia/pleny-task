import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentPage, selectPageSize, selectProducts, selectTotalPages } from '../../store/product.selectors';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';
import { loadProducts, setPage, setPageSize } from '../../store/product.actions';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';

@Component({
  selector: 'app-product-container',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, ProductCardComponent, ProductFilterComponent, AsyncPipe],
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.scss'
})
export class ProductContainerComponent implements OnInit {

  private store = inject(Store);
  private productSrv = inject(ProductService);

  page$: Observable<number>;
  total$: Observable<number>;
  pageSize$: Observable<number>;
  products$: Observable<Product[]>;

  constructor() {
    this.products$ = this.store.select(selectProducts);
    this.total$ = this.store.select(selectTotalPages);
    this.page$ = this.store.select(selectCurrentPage);
    this.pageSize$ = this.store.select(selectPageSize);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  onPageChanged(page: number): void {
    this.store.dispatch(setPage({ page }));
    this.store.dispatch(loadProducts());
  }

  onPageSizeChange(pageSize: number): void {
    this.store.dispatch(setPageSize({ pageSize }));
    this.store.dispatch(loadProducts());
  }

  onAddToCart(): void {
    this.productSrv.addToCart(1);
  }

  onFilterChange(input: any) {
    console.log(input);
  }

}
