import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages-area/home/home.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
];
