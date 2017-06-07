import { Component } from '@angular/core';
import { ExampleModel } from './model/ExampleModel';
import { ExampleModelService } from './model/ExampleModel';
import { GizmoLoadService } from './services/GizmoLoadService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  model : ExampleModel;
  history : Array<ExampleModel>;

  constructor(private modelService: ExampleModelService, private gizmoLoadService: GizmoLoadService) {
    this.model = modelService.model;
    this.history = modelService.history;

    modelService.modelUpdated$.subscribe(model => this.model = model);
  }

  loadGizmos(): void {
    this.gizmoLoadService.load();
  }

  newGizmo(): void {
    this.modelService.modify(this.model.gizmos.items,
      function(items) {
        items.push({name: "Untitled", sprockets: 0});
        return items;
      }
    );
  }

  delete(item) : void {
    this.modelService.modify(this.model.gizmos.items,
      function(items) {
        let i = items.indexOf(item);
        if (i != -1) {
          items.splice(i, 1);
        }
        return items;
      }
    );
  }

  onChangeProperty(item: any, propertyName: string, value: any) {
    this.modelService.modify(item,
      function(item) {
        item[propertyName] = value;
        return item;
      }
    );
  }

  undo(): void {
    this.modelService.popHistory();
  }
}
