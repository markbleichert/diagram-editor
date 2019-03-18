import * as RJD from 'react-js-diagrams';
import { EndpointNodeWidgetFactory } from './EndpointNodeWidget';

export class EndpointWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('endpoint');
  }

  generateReactWidget(diagramEngine, node) {
    return EndpointNodeWidgetFactory({ node });
  }
}
