import { PatientService } from 'src/app/services/patient.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: PatientService,private router: Router) { }
  // eslint-disable-next-line max-len
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.isAuth() === false){
      this.router.navigateByUrl('signin');
      return false;
    }else{
      return this.authService.isAuth();
    }
  }
}
