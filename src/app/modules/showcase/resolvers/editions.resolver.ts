import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Showcase } from 'src/app/models/showcase.model';

@Injectable()
export class EditionsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.apiService.getEditions().pipe(
      mergeMap((editions: any[]) => {
        const editionObservables: Observable<any>[] = editions.map((edition: any) => {
          return this.apiService.getEditionFiles(edition._id).pipe(
            map((files: any[]) => {
              edition.files = files;
              return edition;
            })
          );
        });

        return forkJoin([...editionObservables]);
      })
    );
  }
}
