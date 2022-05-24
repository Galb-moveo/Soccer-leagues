import { Component, OnInit, Input, Output } from '@angular/core';
import { TeamListService } from '../services/team-list.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  constructor(private teamListService:TeamListService) {}
  @Input() element: any;

  

  addToFavorites(team:Array<Array<string>> ):void{
    // this.teamListService.favoriteTeams = []
    this.teamListService.favoriteTeams.push(team[1])
  }
  ngOnInit(): void {}
}
