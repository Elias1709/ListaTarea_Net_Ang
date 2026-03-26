import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from "src/app/material/material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { ModalTodoComponent } from './modales/modal-todo/modal-todo.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    ModalTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule

],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
