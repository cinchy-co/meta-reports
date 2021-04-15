import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IChartData, IChartFilterContext, IChartShownData, ICombinedChartDataAndMeta} from '../../models/Chart.model';
import {BaseChartDirective} from 'ng2-charts';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  providers: [CurrencyPipe]
})
export class LineComponent implements OnInit {
  @Input() chart: ICombinedChartDataAndMeta;
  @Input() colors: any;
  @Output() chartClickedContext: EventEmitter<IChartFilterContext> = new EventEmitter();
  @ViewChild(BaseChartDirective) chartElem: BaseChartDirective;

  data: IChartData;
  lineChartLabels: Array<string>;
  lineChartData: Array<IChartShownData>;
  lineChartColors;
  lineChartUrls = [];
  lineChartOptions = {
    pan: {
      enabled: true,
      mode: 'xy',
    },
    zoom: {
      enabled: true,
      mode: 'xy',
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          color: '#373544'
        },
        ticks: {
          fontColor: '#fff',
          callback(value, index, values) {
            return value;
          }
        }
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
          color: '#373544'
        },
        ticks: {
          fontColor: '#fff',
          callback(value, index, values) {
            return value;
          }
        }
      }]
    },
    legend: {
      position: 'bottom',
      labels: {
        fontColor: '#fff',
        fontSize: 14
      },
      title: {
        fontColor: '#fff'
      }
    },
    onClick: this.chartClicked.bind(this)
  };
  chartUrls;
  clickedLabel: string;

  constructor(private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.data = this.chart.data;
    this.lineChartLabels = this.data.chartLabels;
    this.lineChartData = this.data.chartData;
    this.lineChartColors = this.colors;
    this.chartUrls = this.data.chartUrls;
    this.lineChartOptions.scales.xAxes[0].stacked = this.chart.isStacked;
    this.lineChartOptions.scales.yAxes[0].stacked = this.chart.isStacked;
    this.lineChartOptions.zoom.enabled = this.chart.allowZoom;
    this.lineChartOptions.pan.enabled = this.chart.allowZoom;
    // tslint:disable-next-line:no-unused-expression
    this.chart.isCurrencyData && this.setCurrencyFormat();
  }

  setCurrencyFormat() {
    this.lineChartOptions.scales.yAxes[0].ticks.callback = (value, index, values) => {
      return this.currencyPipe.transform(value, '$');
    };
  }

  resetZoom() {
    // @ts-ignore
    this.chartElem.chart.resetZoom();
  }

  resetFilter() {
    this.clickedLabel = null;
    this.chartClickedContext.emit({valueForFilter: 'all', currentChart: this.chart.queryName});
  }

  chartClicked(event, chartElements) {
    if (chartElements && chartElements.length) {
      const index = chartElements[0]._index;
      this.clickedLabel = this.lineChartLabels[index];
      this.chartClickedContext.emit({valueForFilter: this.lineChartLabels[index], currentChart: this.chart.queryName});
      const url = index && this.chartUrls[index] ? this.chartUrls[index] : null;
      if (url) {
        window.open(url, '_blank');
      }
    }
  }
}

