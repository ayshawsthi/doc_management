import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './user-list/user-list.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';



@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    UserListComponent,
    DocListComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class UsersModule { }
