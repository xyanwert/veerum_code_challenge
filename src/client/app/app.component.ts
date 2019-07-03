import {Component, OnInit} from '@angular/core';
import {FilmDataSourceService} from "./services/film-data-source.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataService: FilmDataSourceService){

  }

  ngOnInit(): void {
    this.dataService.initialize();
  }
}
