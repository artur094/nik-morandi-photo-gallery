import { Component } from '@angular/core';
import { CategoriesService } from './core/api/services/categories.service';
import { map } from 'rxjs/operators';
import { UpdatePwaService } from './core/services/update-pwa.service';
import { environment } from '../environments/environment';

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  readonly environment = environment;

  readonly homePage = {
    title: 'home',
    url: '/gallery/all',
    icon: 'home',
  };

  pages$ = this.categoryService.categoriesList({}).pipe(
    map((categories) =>
      categories.map((category) => ({
        title: category.name,
        url: `/gallery/${category.name}`.toLowerCase(),
        icon: category.icon,
      }))
    ),
    map((categories: MenuItem[]) => [this.homePage].concat(categories))
  );

  constructor(
    private categoryService: CategoriesService,
    private updatePwaService: UpdatePwaService
  ) {
    this.updatePwaService.checkForUpdates();
  }

  goToLogin(): void {
    window.location = (environment.rootUrl + '/admin') as (string | Location) &
      Location;
  }
}
