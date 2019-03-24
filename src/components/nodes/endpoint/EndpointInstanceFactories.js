import * as RJD from '../../../../lib/main';
import { EndpointNodeModel } from './EndpointNodeModel';

export class EndpointNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('EndpointNodeModel');
  }

  getInstance() {
    return new EndpointNodeModel();
  }
}
