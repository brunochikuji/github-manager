import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../pages/home/home.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'page-not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
