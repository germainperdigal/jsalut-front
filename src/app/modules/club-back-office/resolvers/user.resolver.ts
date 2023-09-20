import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Showcase } from 'src/app/models/showcase.model';
import { User } from 'src/app/models/user.model';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.apiService.getUser();
  }
}
