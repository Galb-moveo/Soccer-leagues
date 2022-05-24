import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  constructor(private http: HttpClient) { }
  teamsObject: any = {};
  isOpenModal: boolean = false;
  selectedCountry: string = '';
  teamsArray: Array<Array<string>> = [['']];

  displayAllTeams(countryName: string) {
    this.teamsArray = [];
    this.selectedCountry = countryName;
    this.isOpenModal= false;
    this.teamsObject = [];
    this.http
      .get(
        `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?s=Soccer&c=${countryName}`,
      )
      .pipe(
        map((responseData:any) => {
          this.teamsObject = responseData;
          for (const key in this.teamsObject.teams) {
            this.teamsArray.push([
              this.teamsObject.teams[key].strTeam,
              this.teamsObject.teams[key].strTeamLogo,
            ]);
          }
          return this.teamsArray;
        }),
      )
      .subscribe((post) => {});
    this.isOpenModal = true;
  }
//   getLeagues(): Observable<League[]> {
//     const leagues = of(LEAGUES)
//     return leagues;
//   }

//   getLeague(name:string): Observable<League>{
//     const league = LEAGUES.find(h => h.name === name)!;
//     return of (league);
//   }
  
}