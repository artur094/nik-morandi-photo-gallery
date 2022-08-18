import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { PhotosService } from '../core/api/services/photos.service';
import { combineLatest } from 'rxjs';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage {
  readonly pageSize = 20;

  public category$ = this.activatedRoute.paramMap.pipe(
    map((params) => params.get('category'))
  );
  public page$ = this.activatedRoute.paramMap.pipe(
    map((params) => params.get('page') ?? '1')
  );
  public photos$ = combineLatest([this.category$, this.page$]).pipe(
    debounceTime(100),
    switchMap(([category, page]) =>
      this.photosService
        .photosList({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          category__name: category !== 'all' ? category : undefined,
          page: +page,
        })
        .pipe(this.loadingService.withLoading())
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private photosService: PhotosService,
    private loadingService: LoadingService
  ) {}
}
