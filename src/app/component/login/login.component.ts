import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit{
  loginForm=this.fb.group({
    email : ['',[Validators.required, Validators.email]],
    password : ['', Validators.required],
  })

constructor(
  private authService: AuthenticationService,
  private fb: NonNullableFormBuilder,
  private router: Router,
  private snackBar: MatSnackBar
){}
  ngOnInit(): void { }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  submit(){
    if (!this.loginForm.valid){
      return;
    }

    const { email, password } = this.loginForm.value;
    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    this.authService.login(email,password).subscribe(()=>{
      this.snackBar.open('Login in succesfully', 'X')
      this.router.navigate(['/home']);
    },
    (error) => {
      this.snackBar.open((error), 'X');
      console.error(error)
    })
 
  }

}


