import * as RJD from 'react-js-diagrams';
import { EndpointNodeModel } from './EndpointNodeModel';

export class EndpointNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('EndpointNodeModel');
  }

  getInstance() {
    return new EndpointNodeModel();
  }
}
