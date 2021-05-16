import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageableTableComponent } from './components/manageable-table/manageable-table.component';
import { AddColumnComponent } from './components/manageable-table/modals/add-column/add-column.component';
import { AddRowComponent } from './components/manageable-table/modals/add-row/add-row.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageableTableComponent,
    AddColumnComponent,
    AddRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
