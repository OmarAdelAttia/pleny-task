import { createAction, props } from "@ngrx/store";
import { Product } from "../model/product.model";

export const loadProducts = createAction("[Product] Load Products");
export const loadProductsSuccess = createAction(
    "[Product] Load Products Success",
    props<{
        products: Product[];
        total: number;
        pageSize: number;
        currentPage: number;
    }>()
);
export const loadProductsFailure = createAction(
    "[Product] Load Products Failure",
    props<{ error: any }>()
);

export const setPage = createAction(
    "[Product] Set Page",
    props<{ page: number }>()
);

export const setPageSize = createAction(
    "[Product] Set Page Size",
    props<{ pageSize: number }>()
);

export const setSearchQuery = createAction(
    "[Product] Set Search Query",
    props<{ query: string }>()
);
