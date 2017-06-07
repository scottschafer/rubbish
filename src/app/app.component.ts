import { Component } from '@angular/core';
import { ExampleModel } from './model/ExampleModel';
import { ExampleModelService } from './model/ExampleModelService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private model : ExampleModel;
  private history : Array<ExampleModel>;

  constructor(private modelService : ExampleModelService) {
    this.model = modelService.appState;
    this.history = modelService.history;
  }

  addItem(): void {
    this.modelService.add(this.model.gizmos.items, {name: "Untitled", sprockets: 0});
  }

  onChangeProperty(item: any, propertyName: string, value: any) {
    this.modelService.set(item, propertyName, value);
  }

  undo(): void {
    this.modelService.popHistory();
  }
}
