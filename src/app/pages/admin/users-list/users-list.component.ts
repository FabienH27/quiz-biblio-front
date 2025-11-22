import { Component, inject } from '@angular/core';
import { DatagridComponent } from "../../../components/datagrid/datagrid.component";
import { AsyncPipe } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-list',
  imports: [DatagridComponent, AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  userService = inject(UserService);

  rowData$ = this.userService.getUsers();

}
