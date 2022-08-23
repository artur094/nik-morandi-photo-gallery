/* tslint:disable */
/* eslint-disable */
import { Category } from './category';
export interface Photo {
  category: Category;
  createdAt: string;
  description?: null | string;
  photo: string;
  photoLowRes: string;
  thumbnail: string;
}
