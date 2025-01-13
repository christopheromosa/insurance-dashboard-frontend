import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-policy-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-policy-dialog.component.html',
  styleUrls: ['./edit-policy-dialog.component.css'],
})
export class EditPolicyDialogComponent {
  @Input() policy: any; // The policy object to edit
  @Output() onSave = new EventEmitter<any>(); // Emit event when saving changes
  @Output() onCancel = new EventEmitter<void>(); // Emit event when canceling

  editPolicyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editPolicyForm = this.fb.group({
      policyNumber: [''],
      policyHolderName: [''],
      policyType: [''],
      startDate: [''],
      endDate: [''],
      premiumAmount: [''],
      isActive: [false],
    });
  }

  ngOnChanges() {
    if (this.policy) {
      this.editPolicyForm.patchValue({
        policyNumber: this.policy.policyNumber,
        policyHolderName: this.policy.policyHolderName,
        policyType: this.policy.policyType,
        startDate: new Date(this.policy.startDate),
        endDate: new Date(this.policy.endDate),
        premiumAmount: this.policy.premiumAmount,
        isActive: this.policy.isActive,
      });
    }
  }

  saveChanges() {
    if (this.editPolicyForm.valid) {
      this.onSave.emit(this.editPolicyForm.value);
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
