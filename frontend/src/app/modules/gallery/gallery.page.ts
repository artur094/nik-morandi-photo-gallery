import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  finalize,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { PhotosService } from '../../core/api/services/photos.service';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage {
  @ViewChild('refresher') refresher: IonRefresher;

  readonly pageSize = 20;

  readonly refresherStatus = new BehaviorSubject<boolean>(false);
  readonly refresherStatus$ = this.refresherStatus.asObservable();
  private refresherNotify = new Subject<boolean>();

  public category$ = this.activatedRoute.paramMap.pipe(
    map((params) => params.get('category'))
  );
  public page$ = this.activatedRoute.paramMap.pipe(
    map((params) => params.get('page') ?? '1')
  );
  public photos$ = combineLatest([
    this.category$,
    this.page$,
    this.refresherNotify.asObservable().pipe(startWith(false)),
  ]).pipe(
    debounceTime(100),
    switchMap(([category, page, fromRefresher]) => {
      const source = fromRefresher ? of({}) : this.loadingService.show();

      return source.pipe(
        switchMap(() =>
          this.photosService.photosList({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            category__name__iexact: category !== 'all' ? category : undefined,
            page: +page,
          })
        ),
        finalize(() => {
          this.loadingService.hide(true).subscribe();
          this.completeRefresh();
        })
      );
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private photosService: PhotosService,
    private loadingService: LoadingService
  ) {}

  startRefresh(): void {
    this.refresherStatus.next(true);
    this.refresherNotify.next(true);
  }

  private completeRefresh(): void {
    this.refresher?.complete();
    this.refresherStatus.next(false);
  }
}
