import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PagesModule} from './pages/pages.module';
import {ChartsModule} from 'ng2-charts';
import {AllChartsModule} from './charts/all-charts.module';
import {SharedModule} from './shared/shared.module';
import {CinchyConfig, CinchyModule, CinchyService} from '@cinchy-co/angular-sdk';
import {NgxSpinnerModule} from 'ngx-spinner';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { MatIconModule } from '@angular/material/icon';
import {ConfigService} from './config.service';

export function appLoadFactory(config: ConfigService): any {
  return () => config.loadConfig().toPromise();
}

export function getBaseUrl(): string {
  return document.getElementsByTagName('base')[0].href;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    PagesModule,
    AllChartsModule,
    SharedModule,
    NgxSpinnerModule,
    MatIconModule,
    CinchyModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appLoadFactory,
      deps: [ConfigService],
      multi: true
    },
    CinchyModule,
    CinchyService,
    {
      provide: CinchyConfig,
      useFactory: (config: ConfigService) => {
        return config.envConfig;
      },
      deps: [ConfigService]
    },
    {provide: 'BASE_URL', useFactory: getBaseUrl}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
