import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users.service';
import { Role } from '../../role';
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

users:any[] = [];

addNewUser=this.fb.group({
  email:['',[Validators.required, Validators.email]],
  password:['', Validators.required],
  
},
)

constructor(
  private fb:NonNullableFormBuilder,
  private authService: AuthenticationService,
  private snackBar: MatSnackBar,
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
}
get email(){
  return this.addNewUser.get('email')
}
get password(){
  return this.addNewUser.get('password')
}

submit (){

  const {email, password} = this.addNewUser.value

 if (!this.addNewUser.valid || !email || !password){
 return;
 }
this.authService.addNewUser(email, password, )
.pipe(
switchMap(({ user: { uid } }) =>
  this.usersService.addUser({ uid, email, role: Role.User })))
.subscribe(()=>{
this.snackBar.open("Added succesfully","X");
},
(error) => {
  this.snackBar.open((error), "X")
  console.error(error)
}


)
}
}
