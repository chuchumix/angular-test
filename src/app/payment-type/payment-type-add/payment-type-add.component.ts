import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentType } from 'src/app/shared/models/payment-type.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { PaymentTypeService } from 'src/app/shared/services/payment-type.service';

@Component({
  selector: 'app-payment-type-add',
  templateUrl: './payment-type-add.component.html',
  styleUrls: ['./payment-type-add.component.scss']
})
export class PaymentTypeAddComponent {
  partialPayment: boolean = false;

  constructor(dataStorageService: DataStorageService, private paymentTypeService: PaymentTypeService, private router: Router){}
  
  onCreatePaymentType(form: NgForm){
    const newPaymentType = new PaymentType(
      form.value['id'],
      form.value['name'],
      this.partialPayment,
      form.value['amount']
    );
    this.paymentTypeService.postPaymentTypes(newPaymentType);
    form.reset();
    this.router.navigate(['paymenttype/view']);
  }

}
