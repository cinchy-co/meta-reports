import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChartsWrapperComponent} from './pages/charts-wrapper/charts-wrapper.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: ChartsWrapperComponent
  },
  {
    path: '**', component: ChartsWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
