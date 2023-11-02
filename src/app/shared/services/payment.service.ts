import { Injectable } from "@angular/core";
import { Payment } from "../models/payment.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PaymentService{
    paymentsChanged = new Subject<Payment[]>;
    private payments: Payment[] = [];
    private payment: Payment;

    constructor(private http: HttpClient) {}

    setPayments(payments: Payment[]){
        this.payments = payments;
        this.paymentsChanged.next(this.payments.slice());
    }

    getPayments(){
        return this.payments.slice();
    }

    postPayment(payment: Payment) {
        this.payment = payment;
        this.http
          .post(
            'https://angular-test-b5d35-default-rtdb.firebaseio.com/payments.json',
            this.payment
          )
          .subscribe((response) => {
            console.log(response);
          });
      }
}