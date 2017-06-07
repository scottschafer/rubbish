import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface Gizmo {
  name: string,
  sprockets: number
};

export interface ExampleModel {

  readonly user : {
    name: string;
  },

  readonly gizmos : {
    readonly loading: boolean,
    readonly items: Gizmo[];
  } 
};

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
