import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   jQuery: any;
   loggedIn = false;
   user: any;
   courier = false;

  constructor() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        if (user.email === 'hondauser@mail.ru' ||
          user.email === 'tatauser@mail.ru' ||
          user.email === 'kamazuser@mail.ru' ||
          user.email === 'gazuser@mail.ru') {
          this.courier = true;
        } else {
          this.courier = false;
        }
      } else {
        this.loggedIn = false;
      }
    });
  }

  ngOnInit() {

  }

}
