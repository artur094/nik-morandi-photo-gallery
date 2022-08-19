/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PaginatedPhotoList } from '../models/paginated-photo-list';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotosService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation photosList
   */
  static readonly PhotosListPath = '/api/photos/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `photosList()` instead.
   *
   * This method doesn't expect any request body.
   */
  photosList$Response(params?: {
    category__name__iexact?: string;

    /**
     * Multiple values may be separated by commas.
     */
    category__name__in?: Array<string>;
    created_at__gte?: string;
    created_at__lte?: string;

    /**
     * A page number within the paginated result set.
     */
    page?: number;
  }): Observable<StrictHttpResponse<PaginatedPhotoList>> {

    const rb = new RequestBuilder(this.rootUrl, PhotosService.PhotosListPath, 'get');
    if (params) {
      rb.query('category__name__iexact', params.category__name__iexact, {});
      rb.query('category__name__in', params.category__name__in, {"style":"form","explode":false});
      rb.query('created_at__gte', params.created_at__gte, {});
      rb.query('created_at__lte', params.created_at__lte, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PaginatedPhotoList>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `photosList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  photosList(params?: {
    category__name__iexact?: string;

    /**
     * Multiple values may be separated by commas.
     */
    category__name__in?: Array<string>;
    created_at__gte?: string;
    created_at__lte?: string;

    /**
     * A page number within the paginated result set.
     */
    page?: number;
  }): Observable<PaginatedPhotoList> {

    return this.photosList$Response(params).pipe(
      map((r: StrictHttpResponse<PaginatedPhotoList>) => r.body as PaginatedPhotoList)
    );
  }

  /**
   * Path part for operation photosRetrieve
   */
  static readonly PhotosRetrievePath = '/api/photos/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `photosRetrieve()` instead.
   *
   * This method doesn't expect any request body.
   */
  photosRetrieve$Response(params: {

    /**
     * A unique integer value identifying this Foto.
     */
    id: number;
  }): Observable<StrictHttpResponse<Photo>> {

    const rb = new RequestBuilder(this.rootUrl, PhotosService.PhotosRetrievePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Photo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `photosRetrieve$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  photosRetrieve(params: {

    /**
     * A unique integer value identifying this Foto.
     */
    id: number;
  }): Observable<Photo> {

    return this.photosRetrieve$Response(params).pipe(
      map((r: StrictHttpResponse<Photo>) => r.body as Photo)
    );
  }

}
