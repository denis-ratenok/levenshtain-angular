import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {LevenshtainService} from '../services/levenshtain.service';


@Component({
  selector: 'app-search-board',
  templateUrl: './search-board.component.html',
  styleUrls: ['./search-board.component.css']
})
export class SearchBoardComponent implements OnInit {
  allNames = {};
  suitableNames = [];
  searchWord = '';
  constructor(private dataService: DataService, private levenshtainService: LevenshtainService) {}

  handleChange(event) {
    if (!event.length) {
      this.suitableNames = [];
      return;
    }
    const distancesNames = [];
    for (const name of Object.keys(this.allNames)) {
      const distance = this.levenshtainService.getLevenshtainDistanceWithSwap(event, name);
      distancesNames.push({name, distance});
    }

    let suitableDistances = distancesNames.filter(pair => pair.distance <= 2);
    suitableDistances.sort((cur, next) => cur.distance > next.distance ? 1 : -1);
    suitableDistances = suitableDistances.slice(0, 9);
    this.suitableNames = suitableDistances.map(pair => pair.name);
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => this.allNames = data);
  }

}
