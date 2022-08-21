import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from './core/api/api.module';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ApiModule.forRoot({ rootUrl: environment.rootUrl }),
    HttpClientModule,
    PhotoGalleryModule.forRoot({
      defaultOptions: {
        fullscreenEl: true,
      },
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
