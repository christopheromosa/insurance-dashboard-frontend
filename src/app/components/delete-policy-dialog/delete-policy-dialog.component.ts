import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-policy-dialog',
  templateUrl: './delete-policy-dialog.component.html',
  styleUrls: ['./delete-policy-dialog.component.css'],
})
export class DeletePolicyDialogComponent {
  @Output() onDelete = new EventEmitter<void>(); // Emit event when deleting
  @Output() onCancel = new EventEmitter<void>(); // Emit event when canceling

  constructor() {}

  deletePolicy() {
    this.onDelete.emit(); // Emit delete event
  }

  cancel() {
    this.onCancel.emit(); // Emit cancel event
  }
}
