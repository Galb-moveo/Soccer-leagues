import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import {} from 'google.maps';
import { MyStyle } from './style';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
}) 
export class MapComponent implements OnInit {
  constructor() {}

  @ViewChild('autocomplete', { static: true }) autocomplete: any;
  @ViewChild('mapElement') mapElement: any;
  @ViewChild('placesRef') placesRef: any;
  place: any;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  destinationLat: number = 32.064621;
  destinationLng: number = 34.771629;
  directionsService!: google.maps.DirectionsService;
  directionsDisplay!: google.maps.DirectionsRenderer;
  autoComplete!: google.maps.places.Autocomplete;
  styles: any = MyStyle;
  direction: boolean = false;
  title_add: any;
  latitude: any;
  longitude: any;
  zoom: number = 0;

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyCdOVL2FuNu-3zhOOWhn1AepLW48X9cMis',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const mapOption = {
        center: { lat: 32.064621, lng: 34.771629 },
        zoom: 15,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'gal_map_style'],
        },
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);

      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.placesRef = GooglePlaceDirective;

      this.setCurrentLocation();

      var styledMap = new google.maps.StyledMapType(this.styles, {
        name: 'Gal Map',
      });

      this.autoComplete = new google.maps.places.Autocomplete(
        this.autocomplete.nativeElement,
        {
          types: ['establishment'],
          fields: ['geometry', 'name'],
          componentRestrictions: { country: ['IL'] },
        },
      );
      this.autoComplete.addListener('place_changed', () => {
        const place = this.autoComplete.getPlace();
        new google.maps.Marker({
          position: place.geometry?.location,
          title: place.name,
          map: this.map,
        });
        let newLat = place.geometry?.location?.lat()
        let newLng = place.geometry?.location?.lng()
        this.setCenter(newLat!,newLng! )
      });


      this.map.mapTypes.set('gal_map_style', styledMap);
      this.map.setMapTypeId('gal_map_style');

      this.marker = new google.maps.Marker({
        position: { lat: this.destinationLat, lng: this.destinationLng },
        map: this.map,
      });

      this.directionsDisplay.setMap(this.map);
    });
  }

  setCenter(lat: number, lng: number) {
    this.map.setCenter(new google.maps.LatLng(lat, lng));
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

  // public handleAddressChange() {
  //   const place = this.autoComplete.getPlace();
  //   new google.maps.Marker({
  //     position: place.geometry.location,
  //     title: place.name,
  //     map: this.map
  //   })
  //         this.setCenter(this.destinationLat, this.destinationLng);
  // }

  calcRoute() {
    var request = {
      origin: { lat: 32.0853, lng: 34.7818 },
      destination: { lat: 32.76776, lng: 35.03905 },
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status == google.maps.GeocoderStatus.OK) {
        const output = document.querySelector('#output');
        this.directionsDisplay.setDirections(result);
      } else {
        console.log('error');
      }
    });
  }

  toggleDirection() {
    if (this.direction === false) {
      this.calcRoute();
      this.direction = true;
    } else {
      this.directionsDisplay.setMap(null);
      this.direction = false;
      this.setCenter(this.destinationLat, this.destinationLng);
    }
  }
}
