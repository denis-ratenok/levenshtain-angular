import { Injectable } from '@angular/core';

@Injectable()
export class LevenshtainService {

  constructor() { }

  static changeModifications(method, modifications, j) {
    modifications.push({
      position: j - 1,
      method
    });
  }

  getDistanceWithSwap (str1, str2, limit) {
    const matrix = this.levenshtainWithSwaps(str1, str2, limit);
    if (matrix === undefined) {
      return;
    }
    const i = matrix.length - 1,
          j = matrix[0].length - 1;
    return matrix[i][j];
  }

  getModificationsWithSwap (str1, str2, limit) {
    if (str2.startsWith(str1)) {
      const mods = [];
      for (let i = str2 - str1; i < str2; i++) {
        mods.push({position: i, method: 'insert'});
      }
      return mods;
    }
    const matrix = this.levenshtainWithSwaps(str1, str2, limit);
    if (matrix === undefined) {
      return;
    }
    const modifications = [];
    this.findModifications(matrix, modifications);
    return modifications;
  }

  levenshtainWithSwaps(str1, str2, limit) {
    const arr = [];

    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    if (str1 === str2) {
      return [[0]];
    }

    for (let i = 0; i <= str1.length; i++) {
      const line = [];
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          line[j] = j;
        } else if (j === 0) {
          line[j] = i;
        } else if (str1[i - 1] === str2[j - 2] && str1[i - 2] === str2[j - 1] && i > 1 && j > 1) {
          line[j] = Math.min(
            arr[i - 1][j] + 1,
            line[j - 1] + 1,
            arr[i - 1][j - 1] + !(str1[i - 1] === str2[j - 1]),
            arr[i - 2][j - 2] + 1
          );
        } else {
          // delete, insert, or replace
          line[j] = Math.min(
            arr[i - 1][j] + 1,
            line[j - 1] + 1,
            arr[i - 1][j - 1] + !(str1[i - 1] === str2[j - 1])
          );
        }
      }
      if (i) {
        let underLimit = line.filter(n => n <= limit);
        const underLimitPrev = arr[i - 1].filter(n => n <= limit);
        underLimit = underLimit.concat(underLimitPrev);
        if (!underLimit.length) {
          return;
        }
      }
      arr.push(line);
    }
    return arr;
  }

  findModifications(arr, modifications) {
    const i = arr.length - 1,
      j = arr[0].length - 1;

    if (!i && !j) {
      return modifications;
    }

    const curr = arr[i][j],
          left = j ? arr[i][j - 1] : undefined,
          up = i ? arr[i - 1][j] : undefined,
          diagonal = (i && j) ? arr[i - 1][j - 1] : undefined;

    if (!i && left < curr) {
      LevenshtainService.changeModifications('delete', modifications, j);
      arr.map(list => { list.pop(); });

    } else if (!j && up < curr) {
      LevenshtainService.changeModifications('insert', modifications, j);
      arr.pop();

    } else if (curr === up && curr === left && curr === diagonal) {
        LevenshtainService.changeModifications('swap', modifications, j);
        arr.pop();
        arr.map(list => { list.pop(); });
        arr.pop();
        arr.map(list => { list.pop(); });
    } else if (diagonal <= up && diagonal <= left) {
        if (diagonal < curr) {
          LevenshtainService.changeModifications('replace', modifications, j);
        }
        arr.pop();
        arr.map(list => { list.pop(); });
    } else if (up <= left) {
        if (up < curr) {
          LevenshtainService.changeModifications('insert', modifications, j);
        }
       arr.pop();
    } else {
        if (left < curr) {
          LevenshtainService.changeModifications('delete', modifications, j);
        }
        arr.map(list => {list.pop(); });
    }

    return this.findModifications(arr, modifications);
  }
}
