import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchBoardComponent } from './search-board/search-board.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';
import {LevenshtainService} from './services/levenshtain.service';
import { ProposedItemComponent } from './proposed-item/proposed-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoardComponent,
    ProposedItemComponent,
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
