import {Injectable} from '@angular/core';
import {CinchyService} from '@cinchy-co/angular-sdk';
import {ChartTypes, IChartData, ICombinedChartDataAndMeta} from '../models/Chart.model';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  cachedChartQueries;
  cachedFirstScreenData;

  constructor(private cincyService: CinchyService) {
  }

  getChartQueries() {
    if (this.cachedChartQueries) {
      return of(this.cachedChartQueries);
    }
    const params = {
      '@projectId': sessionStorage.getItem('reportId')
    };
    return this.cincyService.executeQuery('Cinchy Reports', 'Get Chart Meta Data Queries', params).pipe(
      tap(result => {
        this.cachedChartQueries = result;
      })
    );
  }

  getQueriesResponses(queries, type?): Observable<ICombinedChartDataAndMeta>[] {
    const allQueryApiCalls: Observable<ICombinedChartDataAndMeta>[] = [];
    queries.forEach((query) => {
      allQueryApiCalls.push(this.cincyService.executeQuery(query.queryDomain, query.queryName, null)
        .pipe(map(result => (
          {
            queryName: query.header,
            data: this.getChartCombinedData(result, query, type),
            linkedChart: query.parent ? query.parent.split(';')[1] : null,
            sequence: query.sequence,
            filterBy: query.filterBy,
            isStacked: query.isStacked,
            isCurrencyData: query.isCurrencyData,
            allowZoom: query.allowZoom
          }))));
    });
    return allQueryApiCalls;
  }

  getChartCombinedData(result, query, type?) {
    const dataFromQuery = result.queryResult.toObjectArray();
    return type === 'table' ? dataFromQuery.map(data => ({...data}))
      : dataFromQuery.map(data => ({...data, ChartTitle: query.subHeader, ChartHeader: query.header, ChartType: query.queryType}));
  }

  getMappedDataForEachChart(chartDetails) {
    const clonedData = [...chartDetails.data];
    const chartInformation: IChartData = {
      chartLabels: clonedData.map(item => item.Value),
      chartUrls: clonedData.map(item => item.LinkedTableURL),
      chartData: clonedData.map(item => item['DataSeries-1']),
      chartTitle: clonedData[0].ChartTitle,
      chartType: ChartTypes[clonedData[0].ChartType],
      chartHeader: clonedData[0].ChartHeader,
      headerCount: clonedData[0].HeaderCount,
    };
    if (chartInformation.chartType !== 'Doughnut' && chartInformation.chartType !== 'Pie') {
      this.setDataForOtherCharts(clonedData, chartInformation);
    }
    return {...chartDetails, data: chartInformation};
  }

  setDataForOtherCharts(clonedData, chartInformation) {
    chartInformation.chartData = [];
    for (let i = 1; i <= clonedData[0].TotalDataSeriesCount; i++) {
      const keyForDataSeries = `DataSeries-${i}`;
      const dataItem = clonedData.map(item => item[keyForDataSeries] ? item[keyForDataSeries] : 0);
      chartInformation.chartData.push({
        data: dataItem,
        label: clonedData[0][`LabelDataSeries-${i}`]
      });
    }
  }
}
