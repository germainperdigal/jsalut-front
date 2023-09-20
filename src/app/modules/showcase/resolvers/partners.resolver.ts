import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Partner } from 'src/app/models/partner.model';

@Injectable()
export class PartnersResolver implements Resolve<Array<Partner>> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Partner>> {
    return this.apiService.getPartners();
  }
}
