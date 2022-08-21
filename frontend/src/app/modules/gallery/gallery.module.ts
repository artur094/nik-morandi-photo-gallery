import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';
import { SharedModule } from '../../shared/shared.module';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    SharedModule,
    PhotoGalleryModule,
  ],
  declarations: [GalleryPage],
})
export class GalleryPageModule {}
