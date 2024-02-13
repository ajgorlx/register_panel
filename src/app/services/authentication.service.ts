import { Injectable } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { UserCredential, UserInfo, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Observable, concatMap, from, of, tap } from 'rxjs';





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

  
  
  

  updateProfile(profileData: Partial<UserInfo>): Observable<any>{
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if (!user) throw new Error ('Not Authenticated');

        return updateProfile(user, profileData)
      })
    )
  }

  logout(){
    return from (this.auth.signOut());
  }
}

