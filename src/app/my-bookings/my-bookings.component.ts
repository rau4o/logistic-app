import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  user: any;
  bookingsArr: any[] = [];
  bookings: any[] = [];
  courier = false;

  constructor() {
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
    this.getBookings();
    setTimeout(() => {
      if (this.user.email === 'hondauser@mail.ru' ||
        this.user.email === 'tatauser@mail.ru' ||
        this.user.email === 'kamazuser@mail.ru' ||
        this.user.email === 'gazuser@mail.ru') {
        this.courier = true;
        if (this.courier) {
          firebase.firestore().collection('bookings')
            .orderBy('booktime', 'desc')
            .get().then((data) => {
            data.docs.forEach((bookRef) => {
              this.bookings.push(bookRef.data());
              if (this.user.email === 'tatauser@mail.ru') {
                this.bookings = this.bookings.filter(el => (el.vehicle === 'TATA ACE'));
              } else if (this.user.email === 'hondauser@mail.ru') {
                this.bookings = this.bookings.filter(el => (el.vehicle === 'Honda VT750S'));
              } else if (this.user.email === 'kamazuser@mail.ru') {
                this.bookings = this.bookings.filter(el => (el.vehicle === 'Камаз 53215'));
              } else if (this.user.email === 'gazuser@mail.ru') {
                this.bookings = this.bookings.filter(el => (el.vehicle === 'ГАЗ ГАЗель'));
              }
            });
          });
        }
      }
    }, 1000);
  }

  getBookings() {
    firebase.firestore().collection('bookings')
    .where('owner', '==', this.user.uid)
    .orderBy('booktime', 'desc')
    .get().then((data) => {
      data.docs.forEach((bookRef) => {
        this.bookingsArr.push(bookRef.data());
      });
    });
  }

}
