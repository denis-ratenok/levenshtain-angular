import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {LevenshtainService} from '../services/levenshtain.service';


@Component({
  selector: 'app-search-board',
  templateUrl: './search-board.component.html',
  styleUrls: ['./search-board.component.css']
})
export class SearchBoardComponent implements OnInit {
  allWords: object;
  suitableWords = [];
  namesAfterModifications = [];
  searchWord: string;
  confirmWord: string;
  numberSelect = -1;

  constructor(private dataService: DataService,
              private levenshtainService: LevenshtainService) {}

  @Input() distanceLimit: number;
  @Input() wordsLimit: number;
  @Input() placeholder: string;

  handleChange(value) {
    this.numberSelect = -1;
    if (!value.length) {
      this.namesAfterModifications = [];
      return;
    }
    let namesWithDist = [];
    for (const name of Object.keys(this.allWords)) {
      const distance = this.levenshtainService.getDistanceWithSwap(value, name, this.distanceLimit);
      if (distance !== undefined) {
        namesWithDist.push({name, distance});
      }
    }

    namesWithDist.sort((cur, next) => cur.distance > next.distance ? 1 : -1);
    namesWithDist = namesWithDist.slice(0, this.wordsLimit);
    this.suitableWords = namesWithDist.map(pair => pair.name);
    this.namesAfterModifications = [];

    this.applyModifications(this.suitableWords);
  }

  handleSelect(i) {
    this.searchWord = this.suitableWords[i];
    this.namesAfterModifications = [];
  }

  arrowPress(keyCode) {
    const amount = this.suitableWords.length;
    if (this.suitableWords.length) {
      switch (keyCode) {
        case 38: // up
          if (this.numberSelect < 0) {
            this.numberSelect = amount - 1;
          } else if (this.numberSelect === 0) {
            this.confirmWord = this.searchWord;
            this.numberSelect = -1;
          } else {
            this.numberSelect--;
          }
          return false;
        case 40: // down
          if (this.numberSelect === amount - 1) {
            this.numberSelect = - 1;
          } else {
            this.numberSelect = (this.numberSelect + 1) % amount;
          }
          return false;
        case 13: // enter
          const suitableWord = this.suitableWords[this.numberSelect];
          this.confirmWord = suitableWord ? suitableWord : this.searchWord;
          console.log(this.confirmWord); // result
      }
    }
  }

  applyModifications(words) {
    words.map(name => {
      const modName = [],
        modifications = this.levenshtainService.getModificationsWithSwap(this.searchWord, name, this.distanceLimit);

      for (let i = 0; i < name.length; i++) {
        modName.push(`${name[i]}`);
      }

      const inserts = []; // positions with inserts
      modifications.map(mod => {
        switch (mod.method) {
          case 'replace':
            modName[mod.position] = `<span class="replace">${modName[mod.position]}</span>`;
            break;
          case 'delete':
            modName[mod.position] = `<span class="delete">${modName[mod.position]}</span>`;
            break;
          case 'insert':
            inserts.push(mod.position);
            let space = '';
            inserts.forEach(i => {
              space = '';
              if (i === mod.position) {
                space += '&#8194;';
              }
            });
            modName[mod.position] = `${modName[mod.position]}<span class="insert">${space}</span>`;
            break;
          case 'swap':
            modName[mod.position - 1] = `<span class="swap">${modName[mod.position - 1]}</span>`;
            modName[mod.position] = `<span class="swap">${modName[mod.position]}</span>`;
        }
      });
      const modNameStr = modName.reduce((curr, result) => curr + result);
      this.namesAfterModifications.push(modNameStr);
    });
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => this.allWords = data);
  }

}
