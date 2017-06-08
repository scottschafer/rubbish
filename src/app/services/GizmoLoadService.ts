
 /**
 * An example of loading data from a URL into the model.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GizmoStoreService } from '../model/GizmoStore';

const GIZMO_URL ='data:text/plain;charset=utf-8,%5B%7B%22name%22%3A%22My%20first%20gizmo%22%2C%22sprockets%22%3A5%7D%2C%7B%22name%22%3A%22My%20second%20gizmo%22%2C%22sprockets%22%3A8%7D%2C%7B%22name%22%3A%22This%22%2C%22sprockets%22%3A0%7D%2C%7B%22name%22%3A%22was%22%2C%22sprockets%22%3A0%7D%2C%7B%22name%22%3A%22loaded%22%2C%22sprockets%22%3A%2299%22%7D%5D';


@Injectable()
export class GizmoLoadService {
  constructor(private http: Http, private modelService : GizmoStoreService) {}

  load() {
    var model = this.modelService.model;

    model.gizmos.loading = true;


    this.http.get(GIZMO_URL)
      .map(resp => resp.json())
      .subscribe(records =>

        // we've recevied the records, so insert them into the model
        this.modelService.modify(model.gizmos,
          function(gizmos) {
            gizmos.loading = false;
            gizmos.items = records;
            return gizmos;
          })
    );

  }
}
