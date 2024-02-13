import { Component, OnInit } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Role } from '../../role';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confrimPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword){
      return {
        passwordDontMatch: true}
      } else {
    return null;
      }
 }
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{

  signUpform=this.fb.group({
    name:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    password:['', Validators.required],
    confirmPassword:['', Validators.required]
    
  },
  {validators: passwordsMatchValidator()}
  )

constructor(
  private fb:NonNullableFormBuilder,
  private authService: AuthenticationService,
  private snackBar: MatSnackBar,
  private router: Router,
  private usersService: UsersService
){}

  ngOnInit(): void {}
  get email(){
    return this.signUpform.get('email')
  }
  get password(){
    return this.signUpform.get('password')
  }
  get name(){
    return this.signUpform.get('name')
  }
  get confirmPassword(){
    return this.signUpform.get('confirmPassword')
  }
  submit (){

    const {name, email, password} = this.signUpform.value

   if (!this.signUpform.valid || !name || !email || !password){
   return;
   }
this.authService.signUp(email, password, )
.pipe(
  switchMap(({ user: { uid } }) =>
    this.usersService.addUser({uid, email, displayName: name, role:Role.User })))
.subscribe(()=>{
  this.snackBar.open("SignUp confirmed","X");
  this.router.navigate(['/home']);
},
  (error) => {
    this.snackBar.open((error), "X")
    console.error(error)
  }


)
  }
}