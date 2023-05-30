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
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import {IconComponent} from './shared/components/icon/icon.component';

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ApiModule.forRoot({rootUrl: environment.rootUrl}),
        HttpClientModule,
        PhotoGalleryModule.forRoot({
            defaultOptions: {
                fullscreenEl: true,
                closeOnScroll: false,
                isClickableElement: () => false,
                zoomEl: true,
                tapToClose: true,
                modal: true,
                captionEl: true,
            },
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        IconComponent,
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SwUpdate,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
