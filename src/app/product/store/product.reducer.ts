// product.reducer.ts
import { createReducer, on } from "@ngrx/store";
import { loadProductsSuccess, setPage, setPageSize, setSearchQuery } from "./product.actions";
import { Product } from "../model/product.model";

export interface ProductState {
    products: Product[];
    currentPage: number;
    pageSize: number;
    total: number;
    totalPages: number;
    loading: boolean;
    searchQuery: string;
}

export const initialState: ProductState = {
    products: [],
    currentPage: 1,
    pageSize: 6,
    total: 0,
    totalPages: 0,
    loading: true,
    searchQuery: "",
};

export const productReducer = createReducer(
    initialState,
    on(loadProductsSuccess, (state, { products, total }) => {
        const totalPages = Math.ceil(total / state.pageSize);
        const start = (state.currentPage - 1) * state.pageSize;

        const paginatedProducts = products.slice(start, start + state.pageSize);

        return {
            ...state,
            products: paginatedProducts,
            total,
            totalPages,
            loading: false,
        };
    }),
    on(setPage, (state, { page }) => {
        const start = (page - 1) * state.pageSize;
        const paginatedProducts = state.products.slice(
            start,
            start + state.pageSize
        );

        return {
            ...state,
            currentPage: page,
            products: paginatedProducts,
        };
    }),
    on(setPageSize, (state, { pageSize }) => {
        const totalPages = Math.ceil(state.total / pageSize);
        const start = (state.currentPage - 1) * pageSize;
        const paginatedProducts = state.products.slice(start, start + pageSize);

        return {
            ...state,
            pageSize,
            totalPages,
            products: paginatedProducts,
        };
    }),

    on(setSearchQuery, (state, { query }) => ({
        ...state,
        searchQuery: query,
        currentPage: 1,
    }))
);
