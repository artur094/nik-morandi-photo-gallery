/* tslint:disable */
/* eslint-disable */
import { Category } from './category';
export interface Photo {
  category: Category;
  createdAt: string;
  photo: string;
  photoLowRes: string;
  thumbnail: string;
}
