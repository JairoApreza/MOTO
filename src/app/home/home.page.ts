import { Component, OnInit } from '@angular/core';

declare var google; //declaramos como variable para google maps

//AQUI LO DEJAMOS MIENTRAS SE HACE LA CARPETA
interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map = null;
  constructor() {}
ngOnInit(){//aqui se inicia 
  this.loadMap();
}
  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // crea LatLng de la ubicacion que será predeterminada
    const myLatLng = {lat: 4.658383846282959, lng: -74.09394073486328};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');//renderizado se carga de volada
      const marker={
        position:{
          lat: 4.658383846282959, 
          lng: -74.09394073486328

        },
        title:'Localizacion'
      }
      this.addMarker(marker)
    });
  }
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }
}
