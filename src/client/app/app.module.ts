import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './components/google-map/google-map.component'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatListModule, MatProgressBarModule
} from "@angular/material";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AgmSnazzyInfoWindowModule} from "@agm/snazzy-info-window";

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBYKUh5DPMkO8hpJE1A6Su_KJid8jE24iI'}),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    FormsModule,
    AgmSnazzyInfoWindowModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
