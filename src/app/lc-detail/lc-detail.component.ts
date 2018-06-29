import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { customers } from '../data-model';

@Component({
  selector: 'app-lc-detail',
  templateUrl: './lc-detail.component.html',
  styleUrls: ['./lc-detail.component.css']
})

export class LcDetailComponent implements OnInit {

  lcForm: FormGroup;
  customers = customers;

  constructor(private fb: FormBuilder) {
    this.createFormGroup();

    this.lcForm.valueChanges
      .subscribe(data => {
        console.log(JSON.stringify(data));

        // Calculate 'lc_balance + 200' before
        data.lc_001 = data.lc_balance + 200;
        this.lcForm.get('lc_001').setValue(data.lc_001, { emitEvent: false });

        // Calculate L/C Balance
        var tolerance = customers.find(value => (value.id == data.lc_customer_no)).tolerance;
        data.lc_balance = data.lc_amt * (1 + tolerance / 100);
        this.lcForm.get('lc_balance').setValue(data.lc_balance, { emitEvent: false });

        // Calculate 'lc_balance' + 200 after
        data.lc_002 = data.lc_balance + 200;
        this.lcForm.get('lc_002').setValue(data.lc_002, { emitEvent: false });
      });
  }

  ngOnInit() {
  }

  createFormGroup() {
    this.lcForm = this.fb.group({
      lc_ref_no: ['', { required: true }],
      lc_customer_no: 1,
      lc_amt: 0,
      lc_balance: [0, { readonly: true }],
      lc_001: [0, { readonly: true }],
      lc_002: [0, { readonly: true }]
    });
  }
}
