import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ExampleModelService } from './model/ExampleModel';
import { GizmoLoadService } from './services/GizmoLoadService';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule
  ],
  providers: [
    ExampleModelService,
    GizmoLoadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
