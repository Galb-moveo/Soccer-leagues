import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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

  countryNames:string[] = this.leaguesListService.countryNames

  teamsObject: any = {};
  isOpenModal: boolean = false;
  selectedCountry: string = '';
  teamsArray: Array<{}>  =[{ name: '', image:''}];
  favoritesArray = this.teamListService.favoriteTeams
  searchWord:string = '';

  onDelete(fav:any){
    let index = this.favoritesArray.indexOf(fav);
    if (index !== -1) {
      this.favoritesArray.splice(index, 1);
      localStorage.removeItem(fav)
    }
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
            this.teamsArray.push({
              name:this.teamsObject.teams[key].strTeam,
              image:this.teamsObject.teams[key].strTeamBadge ||
                this.teamsObject.teams[key].strTeamLogo,
            });
          }
          return this.teamsArray
        }),
      )
      .subscribe(() => {});
    this.isOpenModal = true;
  }
}
