import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}
  
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    
    this.isLoading = true;
    authObs = this.authService.login(email, password);
    
    this.authService.login(email, password).subscribe(
        resData => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      errorMsg => {
        this.error = errorMsg;
        //this.showErrorAlert(errorMsg);
        console.log(this.error);
        this.isLoading = false;
      }
    );

    form.reset();
  }
  
  ngOnDestroy(): void {
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
