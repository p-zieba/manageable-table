import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from '../../defs/column';
import { Attribute } from './defs/attribute';

@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html'
})
export class AddRowComponent {

  attributes: Attribute[];
  @Output() addRow: EventEmitter<any> = new EventEmitter();
  @ViewChild('content') content: any;

  constructor(private modalService: NgbModal) { }

  open(columns: Column[]): void {
    this.createAttributes(columns);
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => {
        const row = this.createRow();
        this.addRow.emit(row);
      },
      (reason) => {
        console.log(`Dismissed ${reason}.`);
      }
    );
  }

  private createAttributes(columns: Column[]): any {
    this.attributes = [];
    columns.forEach(column => {
      const attribute: Attribute = {
        id: column.id,
        type: column.type,
        value: null
      };

      this.attributes.push(attribute);
    });
  }

  private createRow(): any {
    let row = {};

    this.attributes.forEach(attribute => {
      row[attribute.id] = attribute.value
    });

    return row;
  }

}
