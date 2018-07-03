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
    this.createFormGroup();

    this.lcForm.valueChanges
      .subscribe(data => {
        console.log(JSON.stringify(data));

        // Calculate 'lc_balance + 200' before
        data.lc_balance_before = data.lc_balance;
        this.lcForm.get('lc_balance_before').setValue(data.lc_balance_before, { emitEvent: false });

        // Calculate L/C Balance
        var tolerance = this.customers.find(value => (value.id == data.lc_customer_no)).tolerance;
        data.lc_balance = data.lc_amt * (1 + tolerance / 100);
        this.lcForm.get('lc_balance').setValue(data.lc_balance, { emitEvent: false });

        // Calculate 'lc_balance' + 200 after
        data.lc_balance_after= data.lc_balance;
        this.lcForm.get('lc_balance_after').setValue(data.lc_balance_after, { emitEvent: false });

        // Field does not show on page
        data.lc_balance_hidden = data.lc_balance;
        this.lcForm.get('lc_balance_hidden').setValue(data.lc_balance_hidden, { emitEvent: false });
      });
  }

  ngOnInit() {
    this.cs.getCustomers()
      .subscribe(customers => this.customers = customers.slice(0,10));
  }

  createFormGroup() {
    this.lcForm = this.fb.group({
      lc_ref_no: ['IMLC-', { required: true }],
      lc_customer_no: 11,
      lc_amt: 0,
      lc_balance: [0, { readonly: true }],
      lc_balance_before: [0, { readonly: true }],
      lc_balance_after: [0, { readonly: true }],
      lc_balance_hidden: [0, { readonly: true }]
    });
  }
}
