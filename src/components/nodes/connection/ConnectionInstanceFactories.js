import * as RJD from '../../../../lib/main';
import { ConnectionNodeModel } from './ConnectionNodeModel';

export class ConnectionNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ConnectionNodeModel');
  }

  getInstance() {
    return new ConnectionNodeModel();
  }
}
