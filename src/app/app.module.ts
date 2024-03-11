import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { LandsComponent } from './component/lands/lands.component';
import { HomeComponent } from './component/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from '@angular/fire/compat';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { MatMenuModule } from '@angular/material/menu';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { MatTableModule } from '@angular/material/table';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandsComponent,
    HomeComponent,
    AdminPanelComponent,
    ProfileComponent,
    SignUpComponent,
    UserProfileComponent,

  
    

  ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    NgxPermissionsModule.forRoot(),
    AngularFireModule.initializeApp({ 
    apiKey: "AIzaSyD9eDyPWtUy1Eqg4fxaGlqL0-_ZnWM5GgU",
    authDomain: "register-panel-4b3bd.firebaseapp.com",
    projectId: "register-panel-4b3bd",
    storageBucket: "register-panel-4b3bd.appspot.com",
    messagingSenderId: "349918132357",
    appId: "1:349918132357:web:7a9c0ab560f3324c3251ec",
    measurementId: "G-V582R5CJ3G"
    }),
   AngularFireAuthModule,
   provideFirebaseApp(() => initializeApp({ "projectId": "register-panel-4b3bd","appId": "1:349918132357:web:7a9c0ab560f3324c3251ec","storageBucket": "register-panel-4b3bd.appspot.com","apiKey": "AIzaSyD9eDyPWtUy1Eqg4fxaGlqL0-_ZnWM5GgU","authDomain": "register-panel-4b3bd.firebaseapp.com","messagingSenderId": "349918132357",})),
   provideAuth(() => getAuth()),
   provideFirestore(()=> getFirestore()),


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
