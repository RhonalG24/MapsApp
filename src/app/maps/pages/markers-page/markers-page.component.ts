import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-58.38167131390372, -34.604480512635924);
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();

    }, 0);


    /*
    Creación de un marker personalizado.
    const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'Rhonal Gonzalez';

    const marker = new Marker({
      color: 'red',
      element: markerHtml
    })
      .setLngLat( this.currentLngLat )
      .addTo( this.map )
*/
  }

  createMarker() {
    if (!this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat ,color);
  }

  addMarker( lngLat: LngLat, color: string ):void {
    if (!this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true,

    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.markers.push({ color, marker });
    this.saveTolocalStorage();

    marker.on('dragend', () => {
      this.saveTolocalStorage()
    })
  }

  deleteMarker( index: number){
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
    this.saveTolocalStorage();
  }

  flyTo( marker: Marker) {
    if (!this.map ) return;

    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveTolocalStorage():void {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      };
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
  }

  readFromLocalStorage():void {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );
      this.addMarker( coords, color )

    });
  }


}
