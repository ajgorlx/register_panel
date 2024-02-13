import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  user$ = this.usersService.currentUserProfile$;

  constructor(
    public authService: AuthenticationService,
    private Router: Router,
    private usersService: UsersService

    )
  {}

  title = 'register_panel';

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.Router.navigate(['']);
    })
  }
}
