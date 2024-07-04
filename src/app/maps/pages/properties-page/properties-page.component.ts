import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface House {
  title: string;
  description: string;
  lngLat: [number, number];
}

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {

  public houses: House[] = [
    {
      title: 'Casa residencial, Canadá',
      description: 'Bella propiedad en Katana, Canadá',
      lngLat: [ -75.92722289474008, 45.280015511264466]
    },
    {
      title: 'Casa de playa, México',
      description: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [ -99.91287720907991, 16.828940930185748]
    },
    {
      title: 'Apartamento, Argentina',
      description: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [ -58.430166677283445, -34.57150108832866 ]
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },
  ]

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
}
