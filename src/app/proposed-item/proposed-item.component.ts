import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-proposed-item',
  templateUrl: './proposed-item.component.html',
  styleUrls: ['./proposed-item.component.css']
})
export class ProposedItemComponent implements OnInit {

  constructor() { }

  @Input() value: string;
  ngOnInit() {
  }

}
