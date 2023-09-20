import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';
import { Partner } from 'src/app/models/partner.model';

@Injectable()
export class PartnerResolver implements Resolve<Partner> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partner> {
    return this.apiService.getPartner(route.params['id']);
  }
}
