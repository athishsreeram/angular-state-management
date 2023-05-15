# AngularStateManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.5.

![ngrx](https://github.com/athishsreeram/angular-state-management/blob/master/demo.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Steps to boostrap Ngrx

# Create New Angular Project and install dependency of ngrx

```

ng new angular-state-management --style=scss --routing=false

ng add @ngrx/schematics@15.2.0 --save

npm i @ngrx/store@15.2.0 --save

npm install @ngrx/effects@15.2.0 --save

npm install @ngrx/entity@15.2.0 --save

npm install @ngrx/store-devtools@15.2.0 --save


```

ngrx has 7 key elements

1.STORE
2.ACTION - Use Dispatcher to Modify Data
3.REDUCER
4.EFFECT -
5.SELECTOR - Access Data

# Step 1: Create the Store and link it to Reducer via App.module StoreModule.forRoot(reducers, { metaReducers })

```

➜  angular-state-management git:(master) ✗ ng generate @ngrx/schematics:store State --root --module app.module.ts
CREATE src/app/reducers/index.ts (329 bytes)
UPDATE src/app/app.module.ts (591 bytes)

```

# Step 2: Create the Data structure to manage in State eg: Customer object with field Name customer.module.ts

```

➜  angular-state-management git:(master) ✗ ng generate module Customer
CREATE src/app/customer/customer.module.ts (194 bytes)

ng generate class models/customer

```

# Step 3 Create Action [Customer] Add Customer in customer.actions.ts

```

➜  angular-state-management git:(master) ✗ ng generate action customer/store/action/Customer
? What should be the prefix of the action? y
? Should we generate success and failure actions? Yes
CREATE src/app/customer/store/action/customer.actions.ts (347 bytes)

```

# Step 4 Configure Reducer with Action

```
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

```

# Step 5 Create a View Component and Add a Selector

```
➜  angular-state-management git:(master) ✗ ng generate selector customer/store/selector/Customer
CREATE src/app/customer/store/selector/customer.selectors.spec.ts (104 bytes)
CREATE src/app/customer/store/selector/customer.selectors.ts (70 bytes)

➜  angular-state-management git:(master) ✗ ng generate component customer/CustomerView
CREATE src/app/customer/customer-view/customer-view.component.scss (0 bytes)
CREATE src/app/customer/customer-view/customer-view.component.html (28 bytes)
CREATE src/app/customer/customer-view/customer-view.component.spec.ts (642 bytes)
CREATE src/app/customer/customer-view/customer-view.component.ts (230 bytes)
UPDATE src/app/customer/customer.module.ts (309 bytes)

```

```

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from 'src/app/app.state';

export const selectCustomerState = createFeatureSelector<CustomerState>("demostore");

// ✨ New 👇
export const selectCustomers = createSelector(
    selectCustomerState,
  (state: CustomerState) => state.customers
);

```

```
export class CustomerViewComponent {
  customers$: Observable<Customer[]>;
    constructor(private store: Store<CustomerState>) {
      this.customers$ = this.store.pipe(select(selectCustomers));
    }
}

```

# Step 6 Create Add Component and configure Dispatcher

```

➜  angular-state-management git:(master) ✗ ng generate component customer/CustomerAdd
CREATE src/app/customer/customer-add/customer-add.component.scss (0 bytes)
CREATE src/app/customer/customer-add/customer-add.component.html (27 bytes)
CREATE src/app/customer/customer-add/customer-add.component.spec.ts (635 bytes)
CREATE src/app/customer/customer-add/customer-add.component.ts (226 bytes)
UPDATE src/app/customer/customer.module.ts (413 bytes)


```

```

addCustomer(customerName: string): void {
    const customer = new Customer();
    customer.name = customerName;
    this.store.dispatch(addCustomer(customer));
}

```
