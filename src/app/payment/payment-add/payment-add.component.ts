import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared/models/client.model';
import { PaymentType } from 'src/app/shared/models/payment-type.model';
import { Payment } from 'src/app/shared/models/payment.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.scss'],
})
export class PaymentAddComponent implements OnInit {
  clients: Client[] = [];
  paymentTypes: PaymentType[] = [];
  currentPaymentType: PaymentType;
  errorAmount: boolean = true;
  amountTotal: number = 0;
  clientSelected: string = '';
  paymentTypeSelected: string = '';
  @ViewChild('paymentForm') form: NgForm;
  @ViewChild('amount') amount: MatInput;

  constructor(
    private dataStorageService: DataStorageService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchClients().subscribe((clients) => {
      this.clients = this.clients.concat(clients);
    });
    this.dataStorageService.fetchPaymentTypes().subscribe((paymentTypes) => {
      this.paymentTypes = this.paymentTypes.concat(paymentTypes);
    });
  }

  onCreatePayment(form: NgForm) {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
  } = JSON.parse(localStorage.getItem('userData'));

    const newPayment = new Payment(
      form.value['id'],
      this.clientSelected,
      this.paymentTypeSelected,
      new Date(),
      +form.value['amount'],
      userData.email
    );
    this.paymentService.postPayment(newPayment);

    form.reset();
    this.router.navigate(['consult']);
  }

  changeClient(event){
    if(event.isUserInput){
      this.clientSelected = event.source.value.name
    }
  }
  changeType(event){
    if(event.isUserInput){
      let amount: HTMLElement = document.getElementById('amount');
      this.paymentTypeSelected = event.source.value.name
      if(event.source.value.partialPayment){
        this.errorAmount = true;
        amount.setAttribute('min', '1');
        this.form.setValue({
          amount: '1'
        })
      } else {
        console.log(event.source.value.amount)
        this.errorAmount = false;
        this.amountTotal = event.source.value.amount;
        amount.setAttribute('min', event.source.value.amount);
        this.form.setValue({
          amount: event.source.value.amount
        })
      }
    }
    
  }
}
