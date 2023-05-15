import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from 'src/app/app.state';

export const selectCustomerState = createFeatureSelector<CustomerState>("demostore");

// ✨ New 👇
export const selectCustomers = createSelector(
    selectCustomerState,
  (state: CustomerState) => state.customers
);