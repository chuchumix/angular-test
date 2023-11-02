import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaymentType } from '../models/payment-type.model';

@Injectable()
export class PaymentTypeService {
  paymentTypesChanged = new Subject<PaymentType[]>();
  private currentPaymentType: PaymentType;
  private paymentTypes: PaymentType[] = [];
  private paymentType: PaymentType;

  constructor(private http: HttpClient) {}

  getPaymentTypes() {
    return this.paymentTypes.slice();
  }

  getPaymentType(id: string) {
    return this.http
      .get<PaymentType>(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/paymenttype/'+id+'.json'
      )
      .pipe(
        map((paymentType) => {
          this.currentPaymentType = paymentType;
          this.currentPaymentType.id = id;
          return this.currentPaymentType;
        })
      );
  }

  setPaymentTypes(paymentTypes: PaymentType[]) {
    this.paymentTypes = paymentTypes;
    this.paymentTypesChanged.next(this.paymentTypes.slice());
  }

  postPaymentTypes(paymentType: PaymentType) {
    this.paymentType = paymentType;
    this.http
      .post(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/paymenttype.json',
        this.paymentType
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  deletePaymentTypes(id: string) {
    this.http
      .delete(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/paymenttype/' +
          id +
          '.json'
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  putPaymentTypes(id: string, paymentType: PaymentType) {
    this.http
      .put(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/paymenttype/' +
          id +
          '.json',
        paymentType
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
