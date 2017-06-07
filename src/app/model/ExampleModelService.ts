import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ExampleModel, initialState } from './ExampleModel';
import { RubbishService } from '../rubbish/RubbishService';

@Injectable()
export class ExampleModelService extends RubbishService<ExampleModel> {

  constructor() {
    super(initialState);
  }
}
