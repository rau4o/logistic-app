/// <reference types="@types/googlemaps" />
import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder , FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

declare let google: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  // today =new Date();
   // min=new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()+1)
   // max =new Date(this.today.getFullYear(),this.today.getMonth()+3,this.today.getDate())

  constructor(private mapsApiLoader: MapsAPILoader, private ngZone: NgZone, public fb: FormBuilder) {

    this.myForm = this.fb.group({
      src: ['', [Validators.required]],
      dest: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      goodsType: ['', [Validators.required]],
      dateOfDelivery: ['', [Validators.required]]

    });
    this.user = firebase.auth().currentUser;

   }

  user: any = {};
  message = '';

  zoom: number;
  latitude: number;
  longitude: number;
  latlongs: any = [];
  latlong: any = {};
  latlongsDest: any = [];
  latlongDest: any = {};
  public searchControl: FormControl;
  public searchControlDest: FormControl;
  srcPlaces: string;
  destPlaces: string;
  finaldistance;

  icon = { url: '/assets/delivery-truck.svg', scaledSize: { width: 40, height: 60}};
  icondel = { url: '/assets/placeholder.svg', scaledSize: { width: 40, height: 60}};

  tempoList: any[] = [{
    name: 'Honda VT750S',
    cost: 200
  }, {
    name: 'TATA ACE',
    cost: 400
  }, {
    name: 'Камаз 53215',
    cost: 500
  }, {
    name: 'ГАЗ ГАЗель',
    cost: 1000
  }];

  selectedTempo = 'Available Vehicle Type';
  selectedItem;
  selctedefault = 'SELECT GOOD TYPE';


  myForm: FormGroup;
  selectOption(event) {
    // console.log(event)

  }
  selectItem(event) {

    // console.log(event)
  }

  ngOnInit() {
    this.zoom = 5;
    this.latitude = 12.9141;
    this.longitude = 74.8560;
  }

 calculateDistance() {
   // let returnDist:number;
   const origin: string = this.srcPlaces;
   // console.log(origin)
   const destPlace: string = this.destPlaces;
   // console.log("1")
   const service = new google.maps.DistanceMatrixService();
   // console.log("2")
   service.getDistanceMatrix({
    origins: [origin],
    destinations: [destPlace],
    travelMode: 'DRIVING',
    avoidHighways: false,
    avoidTolls: false,
   }, (response, status) => {
     if (status === 'OK') {
      // console.log("3")
       // let origins =response.originAddresses[0];
       // let destinations =response.destinationAddresses[0];
       if (response.rows[0].elements[0].status === 'ZERO_RESULTS') {
         console.log('better get flight');
       } else {
        const distance = response.rows[0].elements[0].distance;
        // let duration = response.rows[0].elements[0].duration;
        // console.log(distance.value/1000);
        this.finaldistance = distance.value / 1000;
        // let duration_value=duration.value;
        return distance.value / 1000;
       }
     } else {
      console.log('error');
     }

   });
   return ;
 }
 onBook(book) {
   const vehicleType = book.value.vehicleType;
   console.log(vehicleType);
   const phone = book.value.phone;
   const goodsType = book.value.goodsType;
   const dateOfDelivery = book.value.dateOfDelivery;
   let cost = 400;
   if (vehicleType === 'TATA ACE') {
     cost = 10000;
   } else if (vehicleType === 'ГАЗ ГАЗель') {
     cost = 20000;
   } else if (vehicleType === 'Камаз 53215') {
     cost = 30000;
   } else if (vehicleType === 'Honda VT750S') {
     cost = 50000;
   }
   firebase.firestore().collection('bookings').add({
     owner: firebase.auth().currentUser.uid,
     src: this.myForm.get('src').value,
     dest: this.myForm.get('dest').value,
     vehicle: vehicleType,
     cost,
     phone,
     date: dateOfDelivery,
     goods: goodsType,
     status: 'Booked',
     booktime: firebase.firestore.FieldValue.serverTimestamp()

   }).then((data) => {
     // console.log(data);
     this.message = 'You Have Successfully Book!!';
   }).catch((err) => {
     console.log(err);
   });
}
}
