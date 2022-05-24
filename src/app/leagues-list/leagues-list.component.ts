import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { COUNTRIES } from '../countries';
import { LeaguesListService } from '../services/leagues-list.service';
import { TeamListService } from '../services/team-list.service';

@Component({
  selector: 'app-leagues-list',
  templateUrl: './leagues-list.component.html',
  styleUrls: ['./leagues-list.component.scss'],
})
export class LeagueListComponent {
  @Input() el: any;
  constructor(
    private http: HttpClient,
    private leaguesListService: LeaguesListService,
    public teamListService: TeamListService,
  ) {}
  countryNames: string[] = COUNTRIES;

  teamsObject: any = {};
  isOpenModal: boolean = false;
  selectedCountry: string = '';
  teamsArray: Array<Array<string>> = [['']];
  favoritesArray = this.teamListService.favoriteTeams;


  onDelete(fav:any){
    this.favoritesArray.splice(fav);
    return this.favoritesArray;
  }

  displayAllTeams(countryName: string) {
    this.teamsArray = [];
    this.selectedCountry = countryName;
    this.isOpenModal = false;
    this.teamsObject = [];
    this.http
      .get(
        `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?s=Soccer&c=${countryName}`,
      )
      .pipe(
        map((responseData) => {
          this.teamsObject = responseData;
          for (const key in this.teamsObject.teams) {
            this.teamsArray.push([
              this.teamsObject.teams[key].strTeam,
              this.teamsObject.teams[key].strTeamBadge ||
                this.teamsObject.teams[key].strTeamLogo,
            ]);
          }
          return this.teamsArray;
        }),
      )
      .subscribe(() => {});
    this.isOpenModal = true;
  }
}
