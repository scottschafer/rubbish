import { GizmoStore, GizmoStoreService } from '../model/GizmoStore';
import { GizmoLoadService } from '../services/GizmoLoadService';

export class LoadGizmoAction {
  constructor(gizmoLoadService: GizmoLoadService) {
    gizmoLoadService.load();
  }
};

export class NewGizmoAction {
  constructor(gizmoStoreService : GizmoStoreService) {
    let model = gizmoStoreService.model;
    gizmoStoreService.modify(model.gizmos.items,
      function(items) {
        items.push({name: "Untitled", sprockets: 0});
        return items;
      }
    );
  }
};

export class DeleteGizmoAction {
  constructor(gizmoStoreService : GizmoStoreService, item: any) {
    let model = gizmoStoreService.model;

    new DeleteGizmoAction(gizmoStoreService, item);
    gizmoStoreService.modify(model.gizmos.items,
      function(items) {
        let i = items.indexOf(item);
        if (i != -1) {
          items.splice(i, 1);
        }
        return items;
      }
    );
  }
};


export class ModifyPropertyAction {
  constructor(gizmoStoreService: GizmoStoreService, item: any, propertyName: string, value: any) {
    let model = gizmoStoreService.model;

    gizmoStoreService.modify(item,
      function(item) {
        item[propertyName] = value;
        return item;
      }
    );
  }
};