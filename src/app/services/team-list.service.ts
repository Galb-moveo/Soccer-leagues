import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamListService {
  favoriteTeams: Array<Array<string>> = [['https://www.thesportsdb.com/images/media/team/badge/aknt991637628186.png']];

}