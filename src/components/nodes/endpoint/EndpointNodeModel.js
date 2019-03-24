import _ from 'lodash';
import * as RJD from '../../../../lib/main';

export class EndpointNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(0, 192, 255)') {
    super('endpoint');
    this.addPort(new RJD.DefaultPortModel(true, 'endpoint', 'In'));
    this.name = name;
    this.color = color;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color
    });
  }

  getInPorts() {
      return _.filter(this.ports, portModel => !portModel.out);
  }
}
