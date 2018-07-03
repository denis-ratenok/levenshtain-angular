import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchBoardComponent } from './search-board/search-board.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';
import {LevenshtainService} from './services/levenshtain.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService, LevenshtainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
