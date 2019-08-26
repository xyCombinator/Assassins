import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CirclesComponent } from "./circles/circles.component";
import { CircleService } from "./services/circle-service.service";
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CircleComponent } from "./circle/circle.component";
import { RoundComponent } from "./round/round.component";
import { RouterModule, Routes } from "@angular/router";
import { NewCircleComponent } from "./new-circle/new-circle.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CurrentRoundComponent } from "./current-round/current-round.component";
import { LoginComponent } from "./login/login.component";
import { PreviousRoundsComponent } from "./previous-rounds/previous-rounds.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ContentComponentComponent } from "./content-component/content-component.component";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
  declarations: [
    AppComponent,
    CirclesComponent,
    CircleComponent,
    RoundComponent,
    NewCircleComponent,
    CurrentRoundComponent,
    LoginComponent,
    PreviousRoundsComponent,
    ContentComponentComponent,
    LogoutComponent
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
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [CircleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
