import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { HOST_URL } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class ChainsService {
  chains$: Observable<any>;
  constructor(
    _http: HttpClient,
    private _snackbar: MatSnackBar,
    @Inject(HOST_URL) private _hostUrl: string
  ) {
    this.chains$ = _http.get(`${this._hostUrl}/api/events/event-chains`).pipe(
      catchError(error => {
        this._snackbar.open('Chains loading error', 'DISMISS', { duration: 3000 });
        throw error;
      }),
      shareReplay(1)
    );
  }

  getChain(id: string): Observable<any> {
    return this.chains$.pipe(map(chains => chains.find(chain => chain.id === id)));
  }
}
