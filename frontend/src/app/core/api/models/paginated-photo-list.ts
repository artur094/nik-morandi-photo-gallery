/* tslint:disable */
/* eslint-disable */
import { Photo } from './photo';
export interface PaginatedPhotoList {
  count?: number;
  next?: null | string;
  previous?: null | string;
  results?: Array<Photo>;
}
