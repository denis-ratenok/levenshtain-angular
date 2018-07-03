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

    if (str1.includes(str2) || str2.includes(str1)) {
      return Math.abs(str1.length - str2.length);
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

    return arr[str1.length][str2.length];
  }
}
