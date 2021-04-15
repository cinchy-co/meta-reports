import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IChartData, IChartFilterContext} from '../../models/Chart.model';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements OnInit {
  @Input() chart: any;
  @Input() colors: any;
  @Output() chartClickedContext: EventEmitter<IChartFilterContext> = new EventEmitter();
  @ViewChild(BaseChartDirective) chartElem: BaseChartDirective;

  data: IChartData;
  doughnutChartLabels: Array<string>;
  doughnutChartData: Array<number>;
  doughnutChartType = 'doughnut'; // Can be 'pie' or 'doughnut'
  doughnutChartOptions = {
    onClick: this.chartClicked.bind(this),
    plugins: {
      labels: {
        render: 'percentage',
        position: 'outside',
        textMargin: 10,
        fontColor: '#fff',
        fontSize: 14
      }
    },
    legend: {
      labels: {
        fontColor: '#fff',
        fontSize: 12,
        boxWidth: 20
      },
      title: {
        fontColor: '#fff'
      },
      position: 'top'
    }
  };
  doughnutChartColors;
  chartUrls;
  clickedLabel: string;

  constructor() {
  }

  ngOnInit(): void {
    this.data = this.chart.data;
    this.doughnutChartLabels = this.data.chartLabels;
    this.doughnutChartData = this.data.chartData;
    this.doughnutChartType = this.camalize(this.data.chartType);
    this.doughnutChartColors = this.colors;
    this.chartUrls = this.data.chartUrls;
    if (this.doughnutChartLabels.length > 6) {
      this.doughnutChartOptions.legend.position = 'right';
    }
  }

  camalize(str) { // TODO : MOve to service
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
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
    if (chartElements && chartElements[0]) {
      const index = chartElements[0]._index;
      const url = index && this.chartUrls[index] ? this.chartUrls[index] : null;
      this.clickedLabel = this.doughnutChartLabels[index];
      this.chartClickedContext.emit({valueForFilter: this.doughnutChartLabels[index], currentChart: this.chart.queryName});
      if (url) {
        window.open(url, '_blank');
      }
    }
  }

}
