import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamListComponent } from './team-list/team-list.component';
import { LeagueListComponent } from './leagues-list/leagues-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    LeagueListComponent,
    TeamListComponent,
    DashboardComponent,
    LoginComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,Ng2SearchPipeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GooglePlaceModule,
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
