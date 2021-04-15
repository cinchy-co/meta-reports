import {Component, Input, OnInit} from '@angular/core';
import {ChartDataService} from '../../services/chart-data.service';
import {forkJoin} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-landing-dashboard',
  templateUrl: './landing-dashboard.component.html',
  styleUrls: ['./landing-dashboard.component.scss']
})
export class LandingDashboardComponent implements OnInit {
  @Input() firstScreenQueries: any;
  detailsObj = [];
  projectTitle: string;

  constructor(private chartDataService: ChartDataService, private spinner: NgxSpinnerService,
              private appService: AppService) {
  }

  async ngOnInit() {
    if (this.chartDataService.cachedFirstScreenData) {
      this.detailsObj = this.chartDataService.cachedFirstScreenData;
    } else {
      this.setChartsDataDetails(this.chartDataService.getQueriesResponses(this.firstScreenQueries));
    }
    this.projectTitle = this.firstScreenQueries ? this.firstScreenQueries[0].projectTitle : '';
  }

  async setChartsDataDetails(allQueryApiCalls) {
   // this.appService.setLoaderState(true);
    const firstScreenData = await forkJoin(allQueryApiCalls).toPromise();
    this.appService.setLoaderState(false);
    firstScreenData.forEach((item: any) => {
      const obj = {label: item.data[0].label, value: item.data[0].value};
      this.detailsObj.push(obj);
    });
    this.chartDataService.cachedFirstScreenData = this.detailsObj;
  }

}
