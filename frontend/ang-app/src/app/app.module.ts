import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CirclesComponent} from './circles/circles.component';
import {CircleService} from './services/CircleService';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatListModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { CircleComponent } from './circle/circle.component';
import { RoundComponent } from './round/round.component';
import {RouterModule, Routes} from '@angular/router';
import { NewCircleComponent } from './new-circle/new-circle.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CurrentRoundComponent } from './current-round/current-round.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    CirclesComponent,
    CircleComponent,
    RoundComponent,
    NewCircleComponent,
    CurrentRoundComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [CircleService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
