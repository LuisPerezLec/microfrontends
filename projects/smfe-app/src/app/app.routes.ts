import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'banner',
    loadComponent: () =>
      import('./banner/banner.component').then((m) => m.BannerComponent),
  },
];
