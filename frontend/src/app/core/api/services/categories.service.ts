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

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation categoriesList
   */
  static readonly CategoriesListPath = '/api/categories/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `categoriesList()` instead.
   *
   * This method doesn't expect any request body.
   */
  categoriesList$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Category>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.CategoriesListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Category>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `categoriesList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  categoriesList(params?: {
  }): Observable<Array<Category>> {

    return this.categoriesList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Category>>) => r.body as Array<Category>)
    );
  }

  /**
   * Path part for operation categoriesRetrieve
   */
  static readonly CategoriesRetrievePath = '/api/categories/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `categoriesRetrieve()` instead.
   *
   * This method doesn't expect any request body.
   */
  categoriesRetrieve$Response(params: {

    /**
     * A unique integer value identifying this Categoria.
     */
    id: number;
  }): Observable<StrictHttpResponse<Category>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.CategoriesRetrievePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Category>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `categoriesRetrieve$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  categoriesRetrieve(params: {

    /**
     * A unique integer value identifying this Categoria.
     */
    id: number;
  }): Observable<Category> {

    return this.categoriesRetrieve$Response(params).pipe(
      map((r: StrictHttpResponse<Category>) => r.body as Category)
    );
  }

}
