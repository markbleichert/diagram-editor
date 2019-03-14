import * as RJD from 'react-js-diagrams';
import { InputNodeModel } from './InputNodeModel';

export class InputNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('InputNodeModel');
  }

  getInstance() {
    return new InputNodeModel();
  }
}
