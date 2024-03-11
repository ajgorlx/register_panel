import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ProfileUser } from '../user-profile/user-profile.component'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {

user:ProfileUser[] = [];
displayedColumns: string[] = ['firstName', 'lastName', 'displayName','email', 'role', 'phone', 'address'];
dataSource = new MatTableDataSource<ProfileUser>(this.user)

constructor(
  private usersService: UsersService
){}
ngOnInit(): void {
  this.loadUsers();
}

loadUsers() {
  this.usersService.getAllUsers().subscribe(user => {
    this.user = user;
    this.dataSource.data = this.user
  });
}}
