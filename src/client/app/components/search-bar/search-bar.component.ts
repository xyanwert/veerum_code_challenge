import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FilmDataSourceService} from "../../services/film-data-source.service";

@Component({
  selector: 'films-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(public dataSource: FilmDataSourceService) {}


  @Input()
  searchText: string = "";

  ngOnInit() {
  }

  onTextChange(event?: Event) {
    console.log("search for", this.searchText);
    this.dataSource.filter(this.searchText);
  }
}
