import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest/rest.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    RestService
  ]
})
export class ServicesModule { }
