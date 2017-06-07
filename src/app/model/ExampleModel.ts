import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface ExampleModel {

  readonly userName: string;

  readonly gizmos : {
    readonly loading: boolean,
    readonly items: [ {
        name: string,
        sprockets: number
      }
    ]
  } 
};

export const initialState: ExampleModel = {
  userName: "Initial value",
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
