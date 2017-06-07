import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RubbishService } from '../rubbish/RubbishService';
import { Gizmo } from './Gizmo';

/** 
 * Define the structure of the model
 * */
export interface ExampleModel {

  readonly user : {
    name: string;
  },

  readonly gizmos : {
    loading: boolean,
    readonly items: Gizmo[];
  } 
};


/**
 * Create an injectable service with the initial state
 */
@Injectable()
export class ExampleModelService extends RubbishService<ExampleModel> {

  constructor() {
    super(initialState);
  }
}

export const initialState: ExampleModel = {
  user: {
    name: "Your name here" 
  },

  gizmos: {
    loading: false,
    items: [ {
      name: 'gadget',
      sprockets: 5
    },
    {
      name: 'widget',
      sprockets: 8
    },
    ],
  }
};