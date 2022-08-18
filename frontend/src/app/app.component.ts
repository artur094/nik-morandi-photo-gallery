import { Component } from '@angular/core';
import { CategoriesService } from './core/api/services/categories.service';
import { map, tap } from 'rxjs/operators';

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
  homePage = {
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

  constructor(private categoryService: CategoriesService) {}
}
