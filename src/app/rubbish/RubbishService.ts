import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

class ChildLocator {
  constructor(public readonly parent: any, public readonly key: string) {
  }
};

export class RubbishService<T> {

  private _appState: any;
  private _history:Array<T> = new Array<T>();
  private objToParent : Map<any, ChildLocator> = new Map<any,ChildLocator>();

  constructor(initialState:T) {    
    this._appState = Object.assign({}, initialState);//.copy(initialState);
    this.setParents(this._appState);
  }

  get appState(): T {
    return this._appState;
  }

  get history(): Array<T> {
    return this._history;
  }

  updateModel(newData: any): void {
    for (var key in newData) {
      this._appState[key] = newData[key];
    }
  }

  // append an item to an array
  add(toArray:any[], item:any): void {
    let locator: ChildLocator = this.objToParent.get(toArray);
    if (! locator ) {
      throw "crap";
    }

    this.pushHistory();

    let originalArray : any[] = locator.parent[locator.key]; 
    locator.parent[locator.key] = originalArray.concat([item]);
    this.setParents(locator.parent);
  }

    // set a single property
  set(obj: any, property: string, value:any) : void {
    let locator: ChildLocator = this.objToParent.get(obj);
    if (! locator ) {
      throw "crap";
    }

    let parent : any = locator.parent[locator.key];
    var newObj = Object.assign({}, locator.parent[locator.key]);
    newObj[property] = value;

    this.pushHistory();

    locator.parent[locator.key] = newObj;
    this.setParents(locator.parent);
  }

  private addToSnapshot(src:any, dest:any) {
    for (var key in src) {
      if (typeof src[key] === 'object') {
        if (Array.isArray(src[key])) {
          dest[key] = [];
        }
        else {
          dest[key] = {};
        }
        this.addToSnapshot(src[key], dest[key]);         
      }
      else {
        dest[key] = src[key];
      }
    }
  }

  private copySnapshot(src:any, dest: any) {
    for (var key in src) {
      dest[key] = src[key];
      if (typeof src[key] === 'object') {
        this.copySnapshot(src[key], dest[key]);         
      }
    }
  }

  private pushHistory() {
    var snapshot = {};
    this.addToSnapshot(this._appState, snapshot);
    //this.history.push(Object.assign({}, this._appState));
    this._history.push(snapshot as T);
  }

  public popHistory() {
    if (this._history.length) {
      var lastState: T = this._history.shift();
      this.copySnapshot(lastState, this._appState);
      //Object.assign(this._appState, lastState);
      /*
      this._appState = 
      this._appState = Object.assign({}, initialState);//.copy(initialState);
      */

      this.objToParent.clear();
      this.setParents(this._appState);
    }
  }

  private setParents(obj: any) {
    var parent: any = obj;
    if (typeof obj !== 'object') {
      return;
    }

    for (var key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
        this.objToParent.set(obj[key], new ChildLocator(obj, key));
        this.setParents(obj[key]);
      }
    }
  }
};