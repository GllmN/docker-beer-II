import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { BeerListComponent } from './components/beer/beer-list/beer-list.component';
import { BeerFormComponent } from './components/beer/beer-form/beer-form.component';

const routes: Routes = [
    // Home page :
    {path: '', redirectTo: 'beer-list', pathMatch: 'full'},
    {path: 'beer-list', component: BeerListComponent},
    {path: 'beer-form', component: BeerFormComponent},
    {path: 'beer-form/:id', component: BeerFormComponent},

]

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes),
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule { }