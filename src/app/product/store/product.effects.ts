import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadProducts, loadProductsSuccess, loadProductsFailure, setPage, setPageSize, setSearchQuery, } from "./product.actions";
import { catchError, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { ProductService } from "../service/product.service";
import { select, Store } from "@ngrx/store";
import { selectCurrentPage, selectPageSize, selectSearchQuery, } from "./product.selectors";

@Injectable()
export class ProductEffects {

    private store = inject(Store);
    private actions$ = inject(Actions);
    private productSrv = inject(ProductService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts, setPage, setPageSize, setSearchQuery),
            withLatestFrom(
                this.store.pipe(select(selectPageSize)),
                this.store.pipe(select(selectCurrentPage)),
                this.store.pipe(select(selectSearchQuery))
            ),
            mergeMap(([action, pageSize, currentPage, searchQuery]) =>
                this.productSrv.getAllProducts().pipe(
                    tap((response) =>
                        console.log("Products loaded from service:", response)
                    ),
                    map((response) => {
                        let filteredProducts = response.products;
                        if (searchQuery) {
                            filteredProducts = filteredProducts.filter(
                                (product: { title: string }) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                        }
                        return loadProductsSuccess({
                            products: filteredProducts,
                            total: filteredProducts.length,
                            pageSize,
                            currentPage,
                        });
                    }),
                    catchError((error) => of(loadProductsFailure({ error })))
                )
            )
        )
    );
}
