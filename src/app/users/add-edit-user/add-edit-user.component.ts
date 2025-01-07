import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'], // Optional if you have styles
})
export class AddEditUserComponent implements OnInit {
  @Input() userData: User | null = null; // User data for edit mode
  @Input() isEditMode: boolean = false; // Flag to determine Add or Edit mode

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, public modalRef: BsModalRef) {}

  ngOnInit(): void {
    // Initialize form
    this.userForm = this.fb.group({
      fullName: [this.userData?.fullName || '', [Validators.required]],
      email: [this.userData?.email || '', [Validators.required, Validators.email]],
      password: [
        '',
        this.isEditMode ? [] : [Validators.required, Validators.minLength(6)],
      ], // Password only required in Add mode
      role: [this.userData?.role || '', [Validators.required]],
    });
  }

  // Form submission handler
  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.modalRef.hide();
    }
  }

  // Helper method for form validation
  isFieldInvalid(fieldName: string): boolean {
    const control = this.userForm.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }
}