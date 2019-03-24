import * as RJD from '../../../../lib/main';
import { EndpointNodeWidgetFactory } from './EndpointNodeWidget';

export class EndpointWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('endpoint');
  }

  generateReactWidget(diagramEngine, node) {
    return EndpointNodeWidgetFactory({ node });
  }
}
