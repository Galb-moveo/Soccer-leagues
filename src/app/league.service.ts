import { Injectable } from '@angular/core';
import { League } from './league';
import { LEAGUES } from './mock-leagues';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  constructor() { }
  getLeagues(): Observable<League[]> {
    const leagues = of(LEAGUES)
    return leagues;
  }

  getLeague(name:string): Observable<League>{
    const league = LEAGUES.find(h => h.name === name)!;
    return of (league);
  }
  
}
