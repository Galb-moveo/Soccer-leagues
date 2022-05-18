import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeagueListComponent } from './league-list/league-list.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeagueListComponent,
    GroupsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
