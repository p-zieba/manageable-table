import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from '../../defs/column';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html'
})
export class AddColumnComponent {

  columnForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    type: ['', Validators.required]
  });

  @Output() addColumn: EventEmitter<Column> = new EventEmitter();
  @ViewChild('content') content: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  open(): void {
    this.reset();
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => {
        const column = this.createColumn(this.columnForm.get('id').value, this.columnForm.get('type').value);
        this.addColumn.emit(column);
      },
      (reason) => {
        console.log(`Dismissed ${reason}.`);
      }
    );
  }

  private createColumn(id: string, type: string): Column {
    return { id, label: id, type, hidden: false, sticky: false };
  }

  private reset(): void {
    this.columnForm = this.fb.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
    });
  };

}
