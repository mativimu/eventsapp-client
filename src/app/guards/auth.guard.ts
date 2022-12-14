import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetails } from '../entities/user';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private result = true;

  constructor (
    private router: Router,
    private storageService: StorageService,
  ) { 
  }


  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    this.storageService.get('user')
      .then(
        userDetails => {
          if(userDetails.token == '') {
            console.log("guard don't let you pass")
            console.log(`user: ${userDetails}`);
            this.router.navigateByUrl('login')
            this.result = false;
          }
        }
      )
      .catch(
        err => {
          console.log(err.error.message);
          console.log("guard let you pass");
        }
      );      

    return this.result;
  }

}
