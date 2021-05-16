import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { isDate } from 'src/app/utils/utils';
import { Column } from './defs/column';
import { Paginator } from './defs/paginator';
import { Sorter } from './defs/sorter';
import { AddColumnComponent } from './modals/add-column/add-column.component';
import { AddRowComponent } from './modals/add-row/add-row.component';

@Component({
  selector: 'app-manageable-table',
  templateUrl: './manageable-table.component.html',
  styleUrls: ['./manageable-table.component.scss']
})
export class ManageableTableComponent implements OnInit {

  @Input() url: string = '';
  @ViewChild(AddColumnComponent) addColumnModal: AddColumnComponent;
  @ViewChild(AddRowComponent) addRowModal: AddRowComponent;

  paginator: Paginator = {
    page: 1,
    totalItems: 0,
    pages: 1
  };
  sorter: Sorter = {
    sort: undefined,
    order: undefined
  };

  columns: Column[] = [];
  rows: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getMockData(this.url).subscribe((response: any) => {
      this.rows = response.body;
      this.paginator.totalItems = Number(response.headers.get('X-Total-Count'));

      this.paginator.pages = Math.ceil(this.paginator.totalItems / 10);

      for (let key in this.rows[0]) {
        let type = isDate(this.rows[0][key]) ? 'date' : typeof this.rows[0][key];
        this.columns.push({
          id: key,
          label: key,
          type,
          hidden: false,
          sticky: false
        });
      }
    });
  }

  addColumn(column: Column): void {
    this.columns.push(column);
  }

  addRow(row: any): void {
    this.rows.push(row);
  }

  hideColumn(column: Column): void {
    const index = this.columns.indexOf(column);
    if (index > -1) {
      this.columns.splice(index, 1);
    }
  }

  swapColumn(selectedColumn: Column, direction: string): void {
    const columnIndex = this.columns.findIndex(column => column === selectedColumn);
    if (direction === 'toLeft' && columnIndex > 0) {
      [this.columns[columnIndex - 1], this.columns[columnIndex]] = [this.columns[columnIndex], this.columns[columnIndex - 1]];
    }

    if (direction === 'toRight' && columnIndex < this.columns.length - 1) {
      [this.columns[columnIndex], this.columns[columnIndex + 1]] = [this.columns[columnIndex + 1], this.columns[columnIndex]];
    }
  }

  changePage(selectedPage: number): void {
    this.paginator.page = selectedPage;
    this.api.getMockData(this.url, this.paginator.page, this.sorter).subscribe((response: any) => {
      this.rows = response.body;
    });
  }

  sort(column?: Column, order?: string): void {
    if (!column || !order) {
      this.sorter.sort = undefined;
      this.sorter.order = undefined;
    } else {
      this.sorter.sort = column.id;
      this.sorter.order = order;
    }

    this.paginator.page = 1;
    this.api.getMockData(this.url, this.paginator.page, this.sorter).subscribe((response: any) => {
      this.rows = response.body;
    });
  }

  toggleSticky(column: Column): void {
    const columnIndex = this.columns.indexOf(column);
    if (columnIndex > -1) {
      this.columns.splice(columnIndex, 1);

      let lastStickyIndex = this.getLastStickyIndex();

      this.columns.splice(lastStickyIndex + 1, 0, column);
      column.sticky = !column.sticky;
    }
  }

  getLastStickyIndex(): number {
    let lastStickyIndex = -1;
    this.columns.forEach((column, index) => {
      if (column.sticky) {
        lastStickyIndex = index;
      }
    });

    return lastStickyIndex;
  }

}
