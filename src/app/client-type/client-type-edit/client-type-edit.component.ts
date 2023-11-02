import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ClientType } from 'src/app/shared/models/client-type.model';
import { ClientTypeService } from 'src/app/shared/services/client-type.service';
import { HasUnsavedChanges } from 'src/app/shared/unsaved-changes.guard';

@Component({
  selector: 'app-client-type-edit',
  templateUrl: './client-type-edit.component.html',
  styleUrls: ['./client-type-edit.component.scss']
})
export class ClientTypeEditComponent implements OnInit, HasUnsavedChanges{
  clientType: ClientType;
  id: string;
  @ViewChild('clientTypeForm') form: NgForm;

  constructor(private route: ActivatedRoute, private clientTypeService: ClientTypeService, private router: Router){}

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.clientTypeService.getClientType(this.id).subscribe(clientType => {
          this.clientType = clientType;
          this.setData(clientType);
        });
      });
  }

  onUpdateClientType(form: NgForm){
    const newClientType = new ClientType(
      '',
      form.value['name']
    );
    this.clientTypeService.putClientType(this.id, newClientType);
    
    form.reset();
    this.router.navigate(['clienttype/view']);
  }

  setData(clientType: ClientType){
    this.form.setValue({
      id: clientType.id,
      name: clientType.name
    });
  } 
  
  hasUnsavedChanges(): boolean {
      return this.form.dirty;
  }
}
