import { Component } from '@angular/core';
import { GizmoStore, GizmoStoreService } from './model/GizmoStore';
import { GizmoLoadService } from './services/GizmoLoadService';
import { LoadGizmoAction, NewGizmoAction, DeleteGizmoAction, ModifyPropertyAction } from './actions/gizmo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  model : GizmoStore;
  history : Array<GizmoStore>;

  constructor(private modelService: GizmoStoreService, private gizmoLoadService: GizmoLoadService) {
    this.model = modelService.model;
    this.history = modelService.history;

    modelService.modelUpdated$.subscribe(model => this.model = model);
  }

  loadGizmos(): void {
    new LoadGizmoAction(this.gizmoLoadService);
  }

  newGizmo(): void {
    new NewGizmoAction(this.modelService);
  }

  delete(item) : void {
    new DeleteGizmoAction(this.modelService, item);
  }

  onChangeProperty(item: any, propertyName: string, value: any) {
    new ModifyPropertyAction(this.modelService, item, propertyName, value);
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
