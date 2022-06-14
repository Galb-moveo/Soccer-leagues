import { Component, Input } from '@angular/core';
import { TeamListService } from '../services/team-list.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent {
  constructor(private teamListService: TeamListService) {}
  @Input() element: any;

  favArray: any = [this.teamListService.favoriteTeams];

  addToFavorites(team: any): void {
    if (this.teamListService.favoriteTeams.includes(team.image)) {
      return alert('this item already added to favorites');
    } else if (!this.teamListService.favoriteTeams.includes(team.image)) {
      this.teamListService.favoriteTeams.push(team.image);
      localStorage.setItem(
        'favoritesArray',
        this.favArray.slice(this.favArray - 5),
      );
    }
  }
}
