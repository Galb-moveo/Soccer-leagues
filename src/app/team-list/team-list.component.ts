import { Component, Input } from '@angular/core';
import { TeamListService } from '../services/team-list.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent{
  constructor(private teamListService:TeamListService) {}
  @Input() element: any;

  favArray:any = this.teamListService.favoriteTeams

  addToFavorites(team:any ):void{
    this.teamListService.favoriteTeams.push(team.image)
    localStorage.setItem(this.favArray.slice(this.favArray - 5), 'favoritesArray')
  }
}
