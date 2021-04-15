import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CinchyService} from '@cinchy-co/angular-sdk';
import {ChartDataService} from './services/chart-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AppService} from './app.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  fullScreenHeight;
  loader$: Observable<boolean>;

  constructor(private cinchyService: CinchyService, private spinner: NgxSpinnerService,
              private appService: AppService) {
    this.loader$ = this.appService.getLoaderState();
    this.setReportId();
  }

  setReportId() {
    let reportId = this.getQueryStringValue('reportId', window.location.search);
    if (!reportId) {
      reportId = this.getQueryStringValue('reportId', document.referrer); // FOR IFRAME
    }
    if (!sessionStorage.getItem('reportId') || reportId) {
      // tslint:disable-next-line:no-unused-expression
      reportId && sessionStorage.setItem('reportId', reportId);
    }
    console.log('Session reportId', sessionStorage.getItem('reportId'));
  }

  getQueryStringValue(key, url) {
    // tslint:disable-next-line:max-line-length
    return decodeURIComponent(url.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
  }

  ngOnInit(): void {
    if (localStorage.getItem('fullScreenHeight')) {
      this.fullScreenHeight = parseInt(localStorage.getItem('fullScreenHeight'), 10);
      this.setHeight();
    } else {
      window.addEventListener('message', this.receiveMessage, false);
    }
    // this.spinner.show();
    this.appService.setLoaderState(true);
    this.cinchyService.checkIfSessionValid().toPromise().then(response => {
      if (response.accessTokenIsValid) {
        console.log('Already logged in!');
        if (!sessionStorage.getItem('reportId')) {
          this.setReportId();
        }
        this.loggedIn = true;
      } else {
        this.cinchyService.login().then(success => {
          if (success) {
            if (!sessionStorage.getItem('reportId')) {
              this.setReportId();
            }
            this.loggedIn = true;
          }
        }, error => {
          this.appService.setLoaderState(false);
          console.error('Could not login: ', error);
        });
      }
    });
  }

  setHeight() {
    console.log('set height  IF', this.fullScreenHeight);
    const elements = document.getElementsByClassName('full-height-element');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < elements.length; i++) {
      setTimeout(() => {
        if (this.appService.iniFrame()) {
          elements[i]['style'].height = this.fullScreenHeight + 'px';
        }
      }, 500);
    }
  }

// get Full Screen height of screen
  receiveMessage(event) {
    if (event.data.toString().startsWith('[Cinchy][innerHeight]')) {
      this.fullScreenHeight = parseInt(event.data.toString().substring(21), 10) + 4;
      localStorage.setItem('fullScreenHeight', this.fullScreenHeight.toString());
      const elements = document.getElementsByClassName('full-height-element');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < elements.length; i++) {
        setTimeout(() => {
          if (this.appService.iniFrame()) {
            elements[i]['style'].height = this.fullScreenHeight + 'px';
          }
        }, 500);
      }
    }
  }
}
