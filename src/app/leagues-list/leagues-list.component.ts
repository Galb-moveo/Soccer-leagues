import { Component, Input, OnInit } from '@angular/core';
import { League } from '../league';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-leagues-list',
  templateUrl: './leagues-list.component.html',
  styleUrls: ['./leagues-list.component.scss'],
})
export class LeagueListComponent {
  constructor(private http: HttpClient) {}
  leagues: League[] = [];
  country_names: Array<string> = [
    'Spain',
    'England',
    'France',
    'Italy',
    'Israel',
  ];
  teamsObject: any = {};
  isOpenModal: boolean = false;
  selectedCountry: string = '';
  teamsArray: Array<Array<string>> = [['']];

  displayAllTeams(country_name: string) {
    this.teamsArray = [];
    this.selectedCountry = country_name;
    this.isOpenModal = false;
    this.teamsObject = [];
    this.http
      .get(
        `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?s=Soccer&c=${country_name}`,
      )
      .pipe(
        map((responseData) => {
          this.teamsObject = responseData;
          console.log(responseData, 'responseData');
          for (const key in this.teamsObject.teams) {
            this.teamsArray.push([
              this.teamsObject.teams[key].strTeam,
              this.teamsObject.teams[key].strTeamLogo,
            ]);
          }
          console.log(this.teamsArray);
          return this.teamsArray;
        }),
      )
      .subscribe((post) => {});
    this.isOpenModal = true;
  }
}
