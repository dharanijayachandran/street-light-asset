import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetDetailComponent } from './asset-type/pages/asset-detail/asset-detail.component';
import { AssetLayoutComponent } from './asset-type/pages/asset-layout/asset-layout.component';


const routes: Routes = [
  {path:'',component:AssetLayoutComponent},
  {
    path:'pages',
    children: [
      {
        path: 'asset-details',
        component: AssetDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/assets' },
  ]
})
export class AppRoutingModule { }
