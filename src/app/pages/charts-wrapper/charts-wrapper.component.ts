import {Component, Input, OnInit} from '@angular/core';
import {ChartDataService} from '../../services/chart-data.service';
import {CinchyService} from '@cinchy-co/angular-sdk';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {IChartFilterContext, QueryTypes} from '../../models/Chart.model';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-charts-wrapper',
  templateUrl: './charts-wrapper.component.html',
  styleUrls: ['./charts-wrapper.component.scss']
})
export class ChartsWrapperComponent implements OnInit {
  queries;
  chartsDetails;
  tableQueries;
  numberOfChartsOnScreen = 2;
  firstScreenQueries;
  brand: string;
  allTableData;
  chartColors: any = {};
  chartContextForTableFilter: IChartFilterContext;

  constructor(private chartDataService: ChartDataService, private cinchyService: CinchyService,
              private spinner: NgxSpinnerService, private appService: AppService) {
  }

  ngOnInit(): void {
    this.setChartQueriesAndData();
  }

  async setChartQueriesAndData() {
    try {
      const chartResp = await this.chartDataService.getChartQueries().toPromise();
      this.queries = chartResp.queryResult.toObjectArray();
      this.chartColors = this.queries[0].colors ? JSON.parse(this.queries[0].colors) : {};
      const chartQueries = this.queries.filter(query => query.queryType !== QueryTypes.DASHBOARD && query.queryType !== QueryTypes.TABLE);
      this.firstScreenQueries = this.queries.filter(query => query.queryType === QueryTypes.DASHBOARD);
      this.tableQueries = this.queries.filter(query => query.queryType === QueryTypes.TABLE);
      this.brand = this.queries[0].brand || 'Default';
      this.setChartsDataDetails(this.chartDataService.getQueriesResponses(chartQueries));
      this.setTableDetails();
      this.numberOfChartsOnScreen = Number(this.queries[0].numberOfChartsOnScreen) || 2;
    } catch (e) {
      this.appService.setLoaderState(false);
    }
  }

  async setTableDetails() {
    if (this.tableQueries) {
      const allQueryApiCalls = this.chartDataService.getQueriesResponses(this.tableQueries, 'table');
      this.allTableData = await forkJoin(allQueryApiCalls).toPromise();
    }
  }

  async setChartsDataDetails(allQueryApiCalls) {
    if (allQueryApiCalls && allQueryApiCalls.length) {
      const allChartsData = await forkJoin(allQueryApiCalls).toPromise();
      this.mapDataForCharts(allChartsData);
    } else {
      this.chartsDetails = [];
    }
    this.firstScreenQueries && this.firstScreenQueries.length ? this.appService.setLoaderState(true)
      : this.appService.setLoaderState(false);
  }

  getLinkedTable(chart) {
    const connectedChart = this.allTableData.find(table => table.linkedChart === chart.queryName);
    return connectedChart ? connectedChart : null;
  }

  getLinkedTableQuery(chart) {
    const connectedChart = this.tableQueries.find(table => {
      const linkedChart = table.parent ? table.parent.split(';')[1] : '';
      return linkedChart === chart.queryName;
    });
    return connectedChart ? connectedChart : null;
  }

  mapDataForCharts(allChartsData) {
    const allMappedData = [];
    allChartsData.forEach(chartData => {
      const mappedData = this.chartDataService.getMappedDataForEachChart(chartData);
      allMappedData.push(mappedData);
    });
    const sortedCharts = allMappedData.sort((a, b) => a.sequence - b.sequence);
    this.chartsDetails = this.getDataBasedOnNumberOfChartsOnScreen(sortedCharts, this.numberOfChartsOnScreen);
  }

  getDataBasedOnNumberOfChartsOnScreen(mappedData, numberOfChartsOnScreen) {
    const combinedChartDataForScreen = [];
    let combinedCharts = [];
    mappedData.forEach(chart => {
      combinedCharts.push(chart);
      if ((combinedCharts.length <= numberOfChartsOnScreen && combinedCharts.length > 1)) {
        combinedChartDataForScreen.pop();
      }
      combinedChartDataForScreen.push(combinedCharts);
      combinedCharts = combinedCharts.length === numberOfChartsOnScreen ? [] : combinedCharts;
    });
    return combinedChartDataForScreen;
  }

  chartClickedForFilter(chartContext) {
    this.chartContextForTableFilter = chartContext;
  }

}
