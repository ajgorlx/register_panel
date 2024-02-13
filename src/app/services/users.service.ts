import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { ProfileUser } from '../component/user-profile/user-profile.component'; 
import { collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  get currentUserProfile$(): Observable<ProfileUser | null>{
    return this.authService.currentUser$.pipe(
      switchMap(user =>{
        if (!user?.uid){
          return of (null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    )
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService,
  ) { }
  addUser(user: ProfileUser): Observable<any>{
    const ref = doc(this.firestore,'users', user?.uid);
    return from(setDoc(ref, {...user}));
  }
  updateUser(user: ProfileUser): Observable<any>{
    const ref = doc(this.firestore,'users', user?.uid);
    return from(updateDoc(ref, {...user}));

}



getAllUsers(): Observable<ProfileUser[]>{
  
  const usersCollection = collection(this.firestore, 'users');
  return from(getDocs(usersCollection)).pipe(
    switchMap(snapshot => {
      const users: ProfileUser[] = [];
      snapshot.forEach(doc => {
        users.push(doc.data() as ProfileUser);
      });
      return of (users);
    })
  )
}
}
