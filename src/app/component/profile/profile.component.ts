import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NonNullableFormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../role';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{


  user$ = this.authService.currentUser$;

  profileForm = this.fb.group({
    uid:[''],
    email:[''],
    displayName:[''],
    firstName:[''],
    lastName:[''],
    phone:[''],
    address:['']
  })

  constructor(
    private authService: AuthenticationService,
    private fb: NonNullableFormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    
    this.usersService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      this.profileForm.patchValue({...user });
    })

  }

  saveProfile(){
    const { uid, ...data } = this.profileForm.value;

    if (!uid) {
      return
    }
    this.usersService
    .updateUser({ uid, ...data, role:Role.User })
    .pipe()
    this.snackBar.open('Profile updated!', 'X')
  }
}

