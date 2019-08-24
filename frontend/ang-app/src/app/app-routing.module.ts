import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewCircleComponent} from './new-circle/new-circle.component';
import {CircleComponent} from './circle/circle.component';

const routes: Routes = [
  { path: 'new-circle', component: NewCircleComponent },
  {path: 'circle/:name', component: CircleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
