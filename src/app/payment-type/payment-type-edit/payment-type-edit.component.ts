import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PaymentType } from 'src/app/shared/models/payment-type.model';
import { PaymentTypeService } from '../../shared/services/payment-type.service';
import { NgForm } from '@angular/forms';
import { HasUnsavedChanges } from 'src/app/shared/unsaved-changes.guard';

@Component({
  selector: 'app-payment-type-edit',
  templateUrl: './payment-type-edit.component.html',
  styleUrls: ['./payment-type-edit.component.scss']
})
export class PaymentTypeEditComponent implements OnInit, HasUnsavedChanges {
  paymentType: PaymentType;
  id: string;
  partialPayment: boolean = false;
  @ViewChild('paymentTypesForm') form: NgForm;
  
  constructor(private route: ActivatedRoute, private paymentTypeService: PaymentTypeService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.paymentTypeService.getPaymentType(this.id).subscribe(paymentType => {
        this.paymentType = paymentType;
        this.setData(paymentType);
      });
    });
  }

  onUpdatePaymentType(form: NgForm){
    const newPaymentType = new PaymentType(
      '',
      form.value['name'],
      this.partialPayment,
      form.value['amount']
    );
    this.paymentTypeService.putPaymentTypes(this.id, newPaymentType);
    
    form.reset();
    this.router.navigate(['paymenttype/view']);
  }

  setData(paymentType: PaymentType){
    this.form.setValue({
      id: this.id,
      name: paymentType.name,
      amount: paymentType.amount
    });
    this.partialPayment = paymentType.partialPayment;
  }
  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }
}
