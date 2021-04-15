import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsWrapperComponent} from './charts-wrapper/charts-wrapper.component';
import {AllChartsModule} from '../charts/all-charts.module';
import {SharedModule} from '../shared/shared.module';
import {LandingDashboardComponent} from './landing-dashboard/landing-dashboard.component';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [
    ChartsWrapperComponent,
    LandingDashboardComponent
  ],
  imports: [
    BrowserModule,
    AllChartsModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [],
  exports: [
    ChartsWrapperComponent
  ],
  bootstrap: []
})
export class PagesModule {
}
