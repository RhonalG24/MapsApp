import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, LngLatLike, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @Input()
  lngLat!: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;


  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement ) throw "Map Duv not found";
    if ( !this.lngLat ) throw "LngLat can´t be null";

    setTimeout(() => {
      if (!this.divMap) throw 'El elemento HTML no fue encontrado';

      //mapa
      const map = new Map({
        container: this.divMap?.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.lngLat, // starting position [lng, lat]
        zoom: 15, // starting zoom
        interactive: false
      });

      new Marker()
        .setLngLat( this.lngLat )
        .addTo( map )

    }, 0);

    //marker;
  }

}
