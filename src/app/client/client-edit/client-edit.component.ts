import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client } from 'src/app/shared/models/client.model';
import { ClientService } from '../../shared/services/client.service';
import { NgForm } from '@angular/forms';
import { HasUnsavedChanges } from 'src/app/shared/unsaved-changes.guard';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit, HasUnsavedChanges{
  client: Client;
  id: string;
  paymentTypes: string[] = ['Tarjeta', 'Efectivo', 'Depósito', 'Abono', 'Crédito'];
  @ViewChild('clientForm') form: NgForm;

  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router){}

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.clientService.getClient(this.id).subscribe(client => {
          this.client = client;
          this.setData(client);
        });
      });
  }

  onUpdateClient(form: NgForm){
    const newClient = new Client(
      '',
      form.value['name'],
      +form.value['age'],
      form.value['nit'],
      form.value['paymentsTypes']
    );
    this.clientService.putClient(this.id, newClient);
    
    form.reset();
    this.router.navigate(['client/view']);
  }

  setData(client: Client){
    this.form.setValue({
      id: client.id,
      name: client.name,
      age: client.age,
      nit: client.nit,
      paymentsTypes: client.paymentTypes
    });
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }
}
