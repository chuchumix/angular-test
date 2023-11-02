import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Payment } from '../models/payment.model';
import { PaymentService } from './payment.service';
import { Client } from '../models/client.model';
import { ClientService } from './client.service';
import { PaymentType } from '../models/payment-type.model';
import { ClientType } from '../models/client-type.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private paymentService: PaymentService, private clientService: ClientService) {}

  storePayments() {
    const payments = this.paymentService.getPayments();
    this.http
      .put(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/payments.json',
        payments
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchPayments() {
    return this.http.get<{[key: string]: Payment}>('https://angular-test-b5d35-default-rtdb.firebaseio.com/payments.json')
    .pipe(map((payment) => {
      const payments = [];
      for(const key in payment){
        if(payment.hasOwnProperty(key)){
          payments.push({...payment[key], id: key})
        }
      }
      return payments;
    }));
  }

  fetchClients() {
    return this.http.get<{[key: string]: Client}>('https://angular-test-b5d35-default-rtdb.firebaseio.com/client.json')
    .pipe(map((client) => {
      const clients = [];
      for(const key in client){
        if(client.hasOwnProperty(key)){
          clients.push({...client[key], id: key})
        }
      }
      return clients;
    }));
  }

  fetchPaymentTypes() {
    return this.http.get<{[key: string]: PaymentType}>('https://angular-test-b5d35-default-rtdb.firebaseio.com/paymenttype.json')
    .pipe(map((paymentType) => {
      const paymentTypes = [];
      for(const key in paymentType){
        if(paymentType.hasOwnProperty(key)){
          paymentTypes.push({...paymentType[key], id: key})
        }
      }
      return paymentTypes;
    }));
  }

  fetchClientTypes() {
    return this.http.get<{[key: string]: ClientType}>('https://angular-test-b5d35-default-rtdb.firebaseio.com/clienttype.json')
    .pipe(map((clientType) => {
      const clientTypes = [];
      for(const key in clientType){
        if(clientType.hasOwnProperty(key)){
          clientTypes.push({...clientType[key], id: key})
        }
      }
      return clientTypes;
    }));
  }

}
