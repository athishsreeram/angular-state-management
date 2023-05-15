import {
  Action,
  createReducer,
  on
} from '@ngrx/store';

import * as CustomerActions from '../customer/store/action/customer.actions';
import { CustomerState } from '../app.state';


export const initialState: CustomerState = {
    customers: []
};


export const customerReducer = createReducer( 
  
    initialState,
  
    on(CustomerActions.addCustomer,
  
      (state: CustomerState, {customer}) =>
  
        ({...state,
  
          customers: [...state.customers, customer]
  
        }))
  
  );


  export function reducer(state: CustomerState | undefined, action: Action): any {
    
      return customerReducer(state, action);

  }
