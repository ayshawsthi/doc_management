import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  searchForm: FormGroup;
  users: User[] = [];
  filteredUsers: User[] = [];
  modalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private authService: AuthService, private modalService: BsModalService) {
    this.searchForm = this.fb.group({
      searchQuery: [''],
    });
  }

  ngOnInit(): void {
    // Get users from AuthService
    this.users = this.authService.getUsers();
    this.filteredUsers = [...this.users];

    // Subscribe to search query changes
    this.searchForm.get('searchQuery')?.valueChanges.subscribe((value) => {
      this.onSearch(value);
    });
  }

  onSearch(query: string) {
    query = query.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  openEditModal(user: User) {
    const initialState = {
      userData: user,
      isEditMode: true,
    };
    this.modalRef = this.modalService.show(AddEditUserComponent,{initialState,class:'modal-md'});
    this.modalRef.content.onClose.subscribe((user:any) => {
      console.log(user);
    });

  }

  openAddModal(){
    const initialState = {
      isEditMode: false,
    };
    this.modalRef = this.modalService.show(AddEditUserComponent,{initialState,class:'modal-md'})
  }

  onDelete(user: User){
    if (confirm(`Are you sure you want to delete ${user.fullName}?`)) {
      this.users = this.users.filter((u) => u.email !== user.email);
      this.onSearch(this.searchForm.get('searchQuery')?.value || '');
    }
  }
}
