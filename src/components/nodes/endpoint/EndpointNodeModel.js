import _ from 'lodash';
import * as RJD from '../../../../lib/main';

export class EndpointNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(0, 192, 255)', content) {
    super('endpoint');
    this.addPort(new RJD.DefaultPortModel(true, 'endpoint', 'In'));
    this.name = name;
    this.color = color;
    this.content = content;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.content = object.content;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      content: this.content
    });
  }

  getInPorts() {
      return _.filter(this.ports, portModel => !portModel.out);
  }
}
