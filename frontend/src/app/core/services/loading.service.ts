import { Injectable } from '@angular/core';
import { from, Observable, of, pipe } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import {
  finalize,
  map,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { getValueOrError } from '../errors/exceptions';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private counter = 0;

  private loadingElement$?: Observable<HTMLIonLoadingElement>;

  constructor(private loadingController: LoadingController) {}

  public show(): Observable<HTMLIonLoadingElement> {
    if (this.counter === 0) {
      this.loadingElement$ = from(this.loadingController.create()).pipe(
        switchMap((loading) =>
          from(loading.present()).pipe(map(() => loading))
        ),
        shareReplay(1)
      );
    }

    this.counter += 1;
    return getValueOrError(this.loadingElement$);
  }

  public hide(force = false): Observable<boolean> {
    if (force) {
      this.counter = 0;
    } else {
      this.counter = Math.max(this.counter - 1, 0);
    }

    if (this.counter === 0 && this.loadingElement$) {
      return of(null).pipe(
        withLatestFrom(this.loadingElement$),
        switchMap(([, loadingElement]) => from(loadingElement.dismiss()))
      );
    }

    return of(false);
  }

  public withLoading<T>(): (source: Observable<T>) => Observable<T> {
    return pipe(
      this.startWithShowLoading(),
      finalize(() => this.hide().subscribe())
    );
  }

  private startWithShowLoading<T>(): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> =>
      of({}).pipe(
        switchMap(() => this.show()),
        switchMap(() => source)
      );
  }
}
