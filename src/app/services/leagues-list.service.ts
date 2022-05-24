import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, of, map } from 'rxjs';
import {COUNTRIES} from '../countries'
import { LeagueListComponent } from '../leagues-list/leagues-list.component';

@Injectable({
  providedIn: 'root',
})
export class LeaguesListService {
    constructor(private http:HttpClient){}
@Input() el:any;
    teamsObject: any = {};
    isOpenModal: boolean = false;
    // selectedCountry: string = '';
    // selectedCountry:Observable<string> = new Observable<string>();
    selectedCountry: BehaviorSubject<string> = new BehaviorSubject<string>('');
    teamsArray: any[] = [];
  
    displayAllTeams(countryName: string) {
      this.teamsArray = [];
      // this.selectedCountry = countryName
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
  
}