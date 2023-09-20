import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class CurrentEditionApplicationResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.apiService.getCurrentEdition().pipe(switchMap((edition: any) => this.apiService.getApplications(edition._id)));
  }
}
