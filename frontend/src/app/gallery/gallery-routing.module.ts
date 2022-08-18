import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPage } from './gallery.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
  {
    path: ':category',
    children: [
      {
        path: '',
        redirectTo: '1',
        pathMatch: 'full',
      },
      {
        path: ':page',
        component: GalleryPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryPageRoutingModule {}
