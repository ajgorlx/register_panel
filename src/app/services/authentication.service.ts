import { Injectable } from '@angular/core';
import { Auth, authState} from '@angular/fire/auth';
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Observable, from, tap } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  currentUser$ = authState(this.auth);
  

  constructor(
    private auth: Auth,
    ) { }

 

  login (username: string, password:string): Observable<any> {
   return from (signInWithEmailAndPassword(this.auth, username, password)).pipe(
    tap(() => this.isLoggedIn = true)
   )
  }
  isLoggedIn:boolean = false;
  redirectUrl: string|null = null;
  
  signUp( email:string, password:string): Observable<UserCredential>{
    return from (createUserWithEmailAndPassword(this.auth, email, password))
  }
  addNewUser( email:string, password:string): Observable<UserCredential>{
    return from (createUserWithEmailAndPassword(this.auth, email, password))
    .pipe(
      tap(() => {
      }))
  }
  logout(){
    return from (this.auth.signOut());
  }
}

