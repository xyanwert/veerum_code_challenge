import { Injectable } from '@angular/core';
import { FilmData } from "../model/FilmData";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilmDataSourceService {

  private static allData: FilmData[];
  filmsData: FilmData[] = [];
  busy: boolean = false;

  constructor(private client: HttpClient) {}


  initialize() {
    this.filter(null);
    FilmDataSourceService.allData = this.filmsData;
  }


  filter(searchTerm?: string) {

    this.busy = true;
    if (searchTerm == null && FilmDataSourceService.allData != null) {
      return FilmDataSourceService.allData;
    }

    let uri = "api/movies/search/";
    if (searchTerm && searchTerm.length > 0) {
      uri += searchTerm
    }

    this.client.get(uri).subscribe((data: FilmData[]) => {
      this.busy = false;
      this.filmsData = data;
      if (searchTerm == null && FilmDataSourceService.allData == null) {
        FilmDataSourceService.allData = this.filmsData;
      }
    });
  }
}
