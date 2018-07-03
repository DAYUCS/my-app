import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Customer } from '../data-model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-lc-detail',
  templateUrl: './lc-detail.component.html',
  styleUrls: ['./lc-detail.component.css']
})

export class LcDetailComponent implements OnInit {

  lcForm: FormGroup;
  customers: Customer[] = [];

  constructor(private fb: FormBuilder, private cs: CustomerService) {
    // Construct the Form
    this.createFormGroup();

    // When user select defrent customer, call API to get new customer data
    this.lcForm.get('lc_customer_no').valueChanges
      .subscribe(id => this.getCustomer(id));

    // Calculation Rules
    this.lcForm.valueChanges
      .subscribe(data => {
        console.log(JSON.stringify(data));

        // Calculate lc_balance before
        data.lc_balance_before = data.lc_balance;

        // Calculate L/C Balance
        data.lc_balance = data.lc_amt * (1 + data.lc_tolerance_hidden / 100);

        // Calculate lc_balance after
        data.lc_balance_after = data.lc_balance;

        // Calculate Lc-balance does not show on page
        data.lc_balance_hidden = data.lc_balance;

        // Refresh Form
        this.lcForm.patchValue({
          lc_balance_before: data.lc_balance_before,
          lc_balance: data.lc_balance,
          lc_balance_after: data.lc_balance_after,
          lc_balance_hidden: data.lc_balance_hidden
        }, { emitEvent: false });
      });

  }

  ngOnInit() {
    this.cs.getCustomers()
      .subscribe(customers => this.customers = customers.slice(0, 10));
  }

  createFormGroup() {
    this.lcForm = this.fb.group({
      lc_ref_no: ['IMLC-', { required: true }],
      lc_customer_no: 11,
      lc_amt: 0,
      lc_balance: [0, { readonly: true }],
      lc_balance_before: [0, { readonly: true }],
      lc_balance_after: [0, { readonly: true }],
      lc_balance_hidden: [0, { readonly: true }],
      lc_tolerance_hidden: [1, { readonly: true }]
    });
  }

  getCustomer(id) {
    this.cs.getCustomer(id)
      .subscribe(customer =>
        this.lcForm.get('lc_tolerance_hidden').patchValue(customer.tolerance));
  }
}
