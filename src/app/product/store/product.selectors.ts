// product.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";

export const selectProductState = createFeatureSelector<ProductState>(
    "products"
);

export const selectProducts = createSelector(
    selectProductState,
    (state: ProductState) => state.products
);

export const selectCurrentPage = createSelector(
    selectProductState,
    (state: ProductState) => state.currentPage
);

export const selectPageSize = createSelector(
    selectProductState,
    (state: ProductState) => state.pageSize
);

export const selectTotalPages = createSelector(
    selectProductState,
    (state: ProductState) => state.total
);

export const selectPaginatedProducts = createSelector(
    selectProducts,
    selectCurrentPage,
    selectPageSize,
    (products, currentPage, pageSize) => {
        const start = (currentPage - 1) * pageSize;
        return products.slice(start, start + pageSize);
    }
);
export const selectSearchQuery = createSelector(
    selectProductState,
    (state: ProductState) => state.searchQuery
);
