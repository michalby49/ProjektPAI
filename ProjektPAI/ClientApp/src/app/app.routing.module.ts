import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/containers/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./modules/Auth/auth.module')
  //       .then((m) => m.AuthModule),
  // },
  {
    path: 'home',
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import('./modules/home/home.module')
        .then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    enableTracing: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
