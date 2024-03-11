import { Component, ViewChild } from '@angular/core';
import { Role } from '../../role';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}

export interface ProfileUser {
  uid: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  role: Role;
  phone?: string;
  address?: string;
}
