import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared/models/client.model';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent {
  paymentTypes: string[] = ['Tarjeta', 'Efectivo', 'Depósito', 'Abono', 'Crédito'];
  
  constructor(private clientService: ClientService, private router: Router){}


  onCreateClient(form: NgForm){
    const newClient = new Client(
      form.value['id'],
      form.value['name'],
      +form.value['age'],
      form.value['nit'],
      form.value['paymentsTypes']
    );
    this.clientService.postClient(newClient);
    
    form.reset();
    this.router.navigate(['client/view']);
  }

  valNit(){
    let nit = (<HTMLInputElement>document.getElementById("name")).value
    let nd, add=0;
    if(nd =  /^(\d+)\-?([\dkK])$/.exec(nit)){
      nd[2] = (nd[2].toLowerCase()==='k')?10:parseInt(nd[2]);
      for (let i = 0; i < nd[1].length; i++) {
        add += ( (((i-nd[1].length)*-1)+1) * nd[1][i] );
      }
      console.log('true')
      return ((11 - (add % 11)) % 11) === nd[2];
    }else{
      console.log('false')
      return false;
    }
  }
}