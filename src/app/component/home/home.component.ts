import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  user$ = this.usersService.currentUserProfile$

  constructor(
    private usersService: UsersService
  ){}
  ngOnInit(): void {
  }
}

