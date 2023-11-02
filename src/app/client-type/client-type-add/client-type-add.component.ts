import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientType } from 'src/app/shared/models/client-type.model';
import { ClientTypeService } from 'src/app/shared/services/client-type.service';

@Component({
  selector: 'app-client-type-add',
  templateUrl: './client-type-add.component.html',
  styleUrls: ['./client-type-add.component.scss']
})
export class ClientTypeAddComponent {

  constructor(private clientTypeService: ClientTypeService, private router: Router){}

  onCreateClient(form: NgForm){
    const newClientType = new ClientType(
      form.value['id'],
      form.value['name'],
    );
    this.clientTypeService.postClientType(newClientType);
    
    form.reset();
    this.router.navigate(['clienttype/view']);
  }
}
