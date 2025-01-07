import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';



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

  constructor(private fb: FormBuilder, private authService: AuthService, private modalService: BsModalService,
    private toastr: ToastrService
  ) {
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
    this.modalRef.content.onClose.subscribe((user:User) => {
      const userIndex = this.users.findIndex(u => u.id === user.id);
      if(userIndex > -1){
        this.users[userIndex] = {...this.users[userIndex],...user};
        this.filteredUsers = [...this.users];
        this.authService.setUsers(this.users);
        this.toastr.success('User Updated Successfully');
      }
    });

  }

  openAddModal(){
    const initialState = {
      isEditMode: false,
    };
    this.modalRef = this.modalService.show(AddEditUserComponent,{initialState,class:'modal-md'});
    this.modalRef.content.onClose.subscribe((user:User) => {
      this.users.push({id: this.users.length+1, fullName:user.fullName, email:user.email, password:user.password, role: user.role});
      this.filteredUsers = [...this.users];
      this.authService.setUsers(this.users);
      this.toastr.success('User Added Successfully');
    })
  }

  onDelete(user:User) {
		swal.fire({
			title             : 'Are you sure you want to delete ' + user.fullName + ' ?',
			icon              : 'warning',
			showCancelButton  : true,
			confirmButtonText : 'Yes'
		}).then((input) => {
			if (input.value) {
				this.users = this.users.filter(u => u.id !== user.id);
        this.filteredUsers = [...this.users];
        this.authService.setUsers(this.users);
			}
		});
	}
}
