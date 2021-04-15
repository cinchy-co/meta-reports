import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {IChartFilterContext} from '../../models/Chart.model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  @Input('allData') set allData(tableContext) {
    this.rawData = tableContext;
    this.setAllData(this.rawData.data);
  }

  @Input() numberOfChartsOnScreen;
  @Input() tableQuery;

  @Input('chartContextForTableFilter') set chartContextForTableFilter(value: IChartFilterContext) {
    // tslint:disable-next-line:no-unused-expression
    value && this.updateTable(value);
  }

  rawData;
  dataSource;
  columnKeys;
  showTable = true;
  tableStyles;

  constructor() {
  }

  ngOnInit(): void {
    this.tableStyles = this.tableQuery.cssStylesForTables ? JSON.parse(this.tableQuery.cssStylesForTables) : null;
  }

  setAllData(allData) {
    this.columnKeys = allData && allData.length ? Object.keys(allData[0]) : null;
    this.dataSource = new MatTableDataSource<any>(allData);
  }

  updateTable(filterContext: IChartFilterContext) {
    if (this.rawData.filterBy && this.rawData.linkedChart === filterContext.currentChart) {
      const copiedData = this.rawData.data.slice();
      const newTableData = copiedData.filter(tableRow => {
        return tableRow[this.rawData.filterBy] === filterContext.valueForFilter || filterContext.valueForFilter === 'all';
    });
      this.dataSource = new MatTableDataSource<any>(newTableData);
    }
  }
}
