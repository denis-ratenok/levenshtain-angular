import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://gist.githubusercontent.com/ptigas/1965523/raw/efb6272691330649d12e3abbc5f453a04cbc1cf0/names.json');
  }
}
