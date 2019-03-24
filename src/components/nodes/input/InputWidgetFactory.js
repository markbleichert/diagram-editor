import * as RJD from '../../../../lib/main';
import { InputNodeWidgetFactory } from './InputNodeWidget';

export class InputWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('input');
  }

  generateReactWidget(diagramEngine, node) {
    return InputNodeWidgetFactory({ node });
  }
}
