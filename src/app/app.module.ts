import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { LoginComponent } from './login/login.component';
import { CapitalizePipe } from './capitalize.pipe';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BookComponent } from './book/book.component';
import { AgmCoreModule } from "@agm/core";
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { AboutusComponent } from './aboutus/aboutus.component';


var firebaseConfig = {
  apiKey: 'AIzaSyCmL7IpJIumtemv1tSbBjRZ-M2Ph_LcUsc',
  authDomain: 'fb-clone-d039d.firebaseapp.com',
  databaseURL: 'https://fb-clone-d039d-default-rtdb.firebaseio.com/',
  projectId: 'fb-clone-d039d',
  storageBucket: 'fb-clone-d039d.appspot.com',
  messagingSenderId: '215802636137',
  appId: '1:215802636137:web:c76b6b3d90a300797f3ff8'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    CapitalizePipe,
    HomeComponent,
    MenuComponent,
    BookComponent,
    MyBookingsComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey:'enterGoogleMapsApiKey',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
