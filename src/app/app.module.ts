import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { GizmoStoreService } from './model/GizmoStore';
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
    GizmoStoreService,
    GizmoLoadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
