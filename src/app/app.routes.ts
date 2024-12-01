import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages-area/home/home.component';
import { Component } from '@angular/core';
import { TableComponent } from './components/pages-area/table/table.component';

export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path:"table", component: TableComponent}
];
