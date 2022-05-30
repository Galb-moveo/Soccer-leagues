import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, of, map, Observable } from 'rxjs';
import {COUNTRIES} from '../countries'
import { LeagueListComponent } from '../leagues-list/leagues-list.component';
import { TeamListService } from './team-list.service';

@Injectable({
  providedIn: 'root',
})
export class LeaguesListService {
    constructor(private http:HttpClient, private teamListService:TeamListService){}
@Input() el:any;
countryNames: string[] = COUNTRIES;
    teamsObject: any = {};
    isOpenModal: boolean = false;
    selectedCountry: string = '';
    // selectedCountry:Observable<string> = new Observable<string>();
    // selectedCountry: BehaviorSubject<string> = new BehaviorSubject<string>('');
    teamsArray: any[] = [];
    favoritesArray = this.teamListService.favoriteTeams;
  
    displayAllTeams(countryName: string) {
      this.teamsArray = [];
      this.selectedCountry = countryName
      this.isOpenModal = false;
      this.teamsObject = [];
      return this.http
        .get(
          `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?s=Soccer&c=${countryName}`,
        )
        .pipe(
          map((responseData) => {
            this.teamsObject = responseData;
            for (const key in this.teamsObject.teams) {
              this.teamsArray.push(
                this.teamsObject.teams[key].idTeam,
                this.teamsObject.teams[key].strTeam,
                this.teamsObject.teams[key].strTeamLogo || this.teamsObject.teams[key].strTeamBadge ,
              );
              
            }
            return this.teamsArray;
          }),
        )
    }
    // onDelete(fav:any){
    //   let index = this.favoritesArray.indexOf(fav);
    //   if (index !== -1) {
    //     this.favoritesArray =  this.favoritesArray.splice(index, 1);
    //   }
    //   return this.favoritesArray;
    // }
  
}