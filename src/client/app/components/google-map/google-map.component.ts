import { Component, OnInit } from '@angular/core';
import {FilmDataSourceService} from "../../services/film-data-source.service";
import darkStyle from './dark.style.json'


@Component({
  selector: 'film-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {


  styles: any[] = [];

  constructor(public dataSource: FilmDataSourceService) {
  }

  ngOnInit() {
    this.styles = darkStyle;
  }
}
