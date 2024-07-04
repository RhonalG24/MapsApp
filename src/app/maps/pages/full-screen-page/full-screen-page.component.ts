import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, viewChild } from '@angular/core';
import { Map } from 'mapbox-gl'

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;


  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-58.38167131390372, -34.604480512635924], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });;
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
