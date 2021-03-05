import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { ItemComponent } from './item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { FormsModule } from '@angular/forms';
import { FooterSectionComponent } from './footer-section/footer-section.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderSectionComponent,
    AddOrEditComponent,
    ItemComponent,
    AddNewItemComponent,
    FooterSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
