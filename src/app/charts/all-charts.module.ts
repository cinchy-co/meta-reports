import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BarComponent} from './bar/bar.component';
import {DoughnutComponent} from './doughnut/doughnut.component';
import {ChartsModule} from 'ng2-charts';
import {LineComponent} from './line/line.component';
import {RadarComponent} from './radar/radar.component';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import {MatIconModule} from '@angular/material/icon';

const components = [
  BarComponent,
  DoughnutComponent,
  LineComponent,
  RadarComponent
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    ChartsModule,
    MatIconModule,
  ],
  exports: components,
  providers: [],
  bootstrap: []
})
export class AllChartsModule {
}
