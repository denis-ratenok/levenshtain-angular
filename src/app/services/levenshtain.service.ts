import { Injectable } from '@angular/core';

@Injectable()
export class LevenshtainService {

  constructor() { }

  getLevenshtainDistanceWithSwap = (str1, str2) => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    if (str1 === str2) {
      return 0;
    }

    if (str2.startsWith(str1)) {
      return 0.5;
    }

    if (str1.includes(str2)) {
      return str1.length - str2.length;
    }

    const variantsOfStrings = [{str1, str2, deep: 0}];

    this.swap(str1, str2, 0, variantsOfStrings);

    return Math.min(...variantsOfStrings.map((variant) =>
      this.levenshtainDistance(variant.str1, variant.str2) + variant.deep)); // plus count of swaps
  }

  swap = (str1, str2, deep, variants) => {
    // count of swaps
    deep++;
    if (deep >= 3) {
      return;
    }
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] === str2[i + 1] && str1[i + 1] === str2[i]) {
        // swap 2 symbols
        const newStr1 = str1.substring(0, i) + str1[i + 1] + str1[i] +
          str1.substring(i + 2, str1.length);
        variants.push({
          str1: newStr1,
          str2,
          deep
        });
        this.swap(newStr1, str2, deep, variants);
      }
    }
  }

  levenshtainDistance = (str1, str2) => {
    const arr = [];
    const modifications = [];

    for (let i = 0; i <= str1.length; i++) {
      const line = [];
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          line[j] = j;
        } else if (j === 0) {
          line[j] = i;
        } else {
          // delete, insert, or replace
          line[j] = Math.min(
            arr[i - 1][j] + 1,
            line[j - 1] + 1,
            arr[i - 1][j - 1] + !(str1[i - 1] === str2[j - 1])
          );
        }
      }
      arr.push(line);
    }

    this.findModifications(arr, arr[str1.length][str2.length], modifications);
    return modifications.length;
  }

  findModifications(arr, distance, modifications) {
    const i = arr.length - 1,
      j = arr[0].length - 1;

    if (!i && !j) {
      return modifications;
    }

    if (!i && arr[i][j - 1] < distance) {
      this.changeModifications('insert', modifications, distance, j);

      arr.map(list => { list.pop(); });
    } else if (!j && arr[i - 1][j] < distance) {
      this.changeModifications('delete', modifications, distance, j);
      arr.pop();
    }	else if (arr[i - 1][j - 1] <= arr[i - 1][j] && arr[i - 1][j - 1] <= arr[i][j - 1]) {
      if (arr[i - 1][j - 1] < distance) {
        this.changeModifications('replace', modifications, distance, j);
      }

      arr.pop();
      arr.map(list => { list.pop(); });
    } else if (arr[i - 1][j] <= arr[i][j - 1]) {
      if (arr[i - 1][j] < distance) {
        this.changeModifications('delete', modifications, distance, j);
      }

      arr.pop();
    } else {
      if (arr[i][j - 1] < distance) {
        this.changeModifications('insert', modifications, distance, j);
      }

      arr.map(list => {list.pop(); });
    }

    return this.findModifications(arr, distance, modifications);
  }
  changeModifications(method, modifications, distance, j) {
    modifications.push({
      position: j - 1,
      method
    });
    distance--;
  }
}
