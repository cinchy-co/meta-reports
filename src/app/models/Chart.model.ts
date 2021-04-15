export interface IChartData {
  chartLabels: Array<string>;
  chartUrls: Array<string>;
  chartData: Array<any>;
  chartTitle: string;
  chartType: string;
  chartHeader: string;
  headerCount: string;
}

export interface ICombinedChartDataAndMeta {
  allowZoom: boolean;
  data: any;
  filterBy: string;
  isCurrencyData: boolean;
  isStacked: boolean;
  linkedChart: string;
  queryName: string;
  sequence: number;
}

export const QueryTypes = {
  TABLE: 'Table',
  CHART: 'Chart',
  DASHBOARD: 'Dashboard'
};

export const ChartTypes = {
  'Horizontal Bar Chart': 'Horizontal Bar',
  'Vertical Bar Chart': 'Bar',
  'Pie Chart': 'Pie',
  'Doughnut Chart': 'Doughnut',
  'Line Chart': 'Line',
  'Radar Chart': 'Radar'
};

// TODO: MAKE ALL COLORS RGB


export interface IChartShownData {
  data: Array<any>;
  label: string;
}

export interface IChartFilterContext {
  valueForFilter: string;
  currentChart: string;
}
