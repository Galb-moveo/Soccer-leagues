import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import {} from 'google.maps';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MyStyle } from './style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor() {}
  @ViewChild('mapElement') mapElement: any;
  @ViewChild('placesRef') placesRef: any = GooglePlaceDirective;
  map: any;
  marker: any;
  autoComplete:any;
  destinationLat: number = 32.064621;
  destinationLng: number = 34.771629;
  directionsService: any = new google.maps.DirectionsService();
  directionsDisplay: any = new google.maps.DirectionsRenderer();
  styles: any= MyStyle;

  options: any = {
    type: [],
    componentRestrictions: { country: 'IL' },
  };

  title_add: any;
  latitude: any;
  longitude: any;
  zoom: number= 0;

  ngAfterViewInit(): void {
    const mapOption = {
      center: { lat: 32.064621, lng: 34.771629 },
      zoom: 15,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'gal_map_style'],
      },
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);

    var styledMap = new google.maps.StyledMapType(this.styles, {
      name: 'Gal Map',
    });

    this.map.mapTypes.set('gal_map_style', styledMap);
    this.map.setMapTypeId('gal_map_style');

    this.marker = new google.maps.Marker({
      position: { lat: this.destinationLat, lng: this.destinationLng },
      map: this.map,
    });

    this.directionsDisplay.setMap(this.map);
  }

  setCenter(lat: number, lng: number) {
    this.map.setCenter(new google.maps.LatLng(lat, lng));
  }

  calcRoute() {
    var request = {
      origin: { lat: 32.0853, lng: 34.7818 },
      destination: { lat: 32.76776, lng: 35.03905 },
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status == google.maps.DirectionsStatus.OK) {
        const output = document.querySelector('#output');
        this.directionsDisplay.setDirections(result);
      } else {
        console.log('err');
      }
    });
  }

  public handleAddressChange(address: Address) {
    this.destinationLat = address.geometry.location.lat();
    this.destinationLng = address.geometry.location.lng();
    this.marker = new google.maps.Marker({
      position: { lat: this.destinationLat, lng: this.destinationLng },
      map: this.map,
    });
    this.setCenter(this.destinationLat, this.destinationLng);
  }

  public setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.altitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  ngOnInit(): void {
    this.setCurrentLocation();
  }
}
