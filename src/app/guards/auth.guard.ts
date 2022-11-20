import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetails } from '../entities/userdetails';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private user: UserDetails | null = null;

  constructor(
    private router: Router,
    private storageService: StorageService,
  ){ }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.loadUser();
    
    if(!this.user){
      this.router.navigateByUrl('login')
      console.log("guard don't let you pass")
      console.log(`user: ${JSON.stringify(this.user)}`);
      return false;
    }
    console.log("guard let you pass");
    console.log(`user: ${JSON.stringify(this.user)}`);
    return true;
  }
  
  public async loadUser(){
    await this.storageService.get('user')
      .then(data => {this.user = data as UserDetails});
    }
}
