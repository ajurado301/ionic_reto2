import { Component } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public latPro: number;
  public lonPro: number;
  public latObs: number;
  public lonObs: number;

  constructor(private geolocation: Geolocation) {
    this.reset();
  }

  public gpsPromesa(){
    this.geolocation.getCurrentPosition()
    .then((resp)=>{
      this.latPro = resp.coords.latitude;
      this.lonPro = resp.coords.longitude;
    })
    .catch((error)=> {
      console.log("Error al geolocalizar con promesa", error);
    })
  }

  public gpsObservable(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((resp: any)=>{
      this.latObs = resp.coords.latitude;
      this.lonObs = resp.coords.longitude;
    }, (error) => {
      console.log("Error al geolocalizar con observable", error);
    })
  }

  reset() {
    this.latPro = 0;
    this.lonPro = 0;
    this.latObs = 0;
    this.lonObs = 0;
  }
}
