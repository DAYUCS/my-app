import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { customers } from '../data-model';

@Component({
  selector: 'app-lc-detail',
  templateUrl: './lc-detail.component.html',
  styleUrls: ['./lc-detail.component.css']
})

export class LcDetailComponent implements OnInit {
  
  lcForm: FormGroup;
  customers = customers;

  constructor() {
    this.lcForm = this.createFormGroup();
   }

  ngOnInit() {
  }

  createFormGroup() {
    return new FormGroup({
      lcData: new FormGroup({
        lc_ref_no: new FormControl(),
        lc_customer_no: new FormControl(),
        lc_amt: new FormControl(),
        lc_balance: new FormControl
      })
    });
  }
}
