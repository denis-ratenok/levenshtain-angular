import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  numberSelectName = -1;
  constructor(private dataService: DataService, private levenshtainService: LevenshtainService) {}
  @Input() distanceLimit: number;
  @Input() wordsLimit: number;
  @ViewChild('ulProposed') ulProposed: ElementRef;

  handleChange(value) {
    this.numberSelectName = -1;
    if (!value.length) {
      this.suitableNames = [];
      return;
    }
    let distancesNames = [];
    for (const name of Object.keys(this.allNames)) {
      const distance = this.levenshtainService.getDistanceWithSwap(value, name, this.distanceLimit);
      if (distance !== undefined) {
        distancesNames.push({name, distance});
      }
    }

    distancesNames.sort((cur, next) => cur.distance > next.distance ? 1 : -1);
    distancesNames = distancesNames.slice(0, this.wordsLimit);
    this.suitableNames = distancesNames.map(pair => pair.name);
  }

  handleSelect(name) {
    this.searchWord = name;
    this.suitableNames = [];
  }

  arrowPress(keyCode) {
    if (this.suitableNames.length) {
      switch (keyCode) {
        case 38: // up
          if (this.numberSelectName < 0) {
            this.numberSelectName += this.suitableNames.length;
          } else if (this.numberSelectName === 0) {
            this.numberSelectName += this.suitableNames.length - 1;
          } else {
            this.numberSelectName--;
          }
          this.searchWord = this.ulProposed.nativeElement.children[this.numberSelectName].textContent;
          return false;
        case 40: // down
          this.numberSelectName = (this.numberSelectName + 1) % this.suitableNames.length;
          this.searchWord = this.ulProposed.nativeElement.children[this.numberSelectName].textContent;
          return false;
      }
    }
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => this.allNames = data);
  }

}
