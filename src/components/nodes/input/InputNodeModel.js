import _ from 'lodash';
import * as RJD from '../../../../lib/main';

export class InputNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(192, 255, 0)', image = '') {
    super('input');
    this.addPort(new RJD.DefaultPortModel(true, 'input', 'In'));
    this.addPort(new RJD.DefaultPortModel(false, 'out1', 'Out 1'));
    this.addPort(new RJD.DefaultPortModel(false, 'out2', 'Out 2'));

    this.name = name;
    this.color = color;
    this.image = image;
  }

  addPortOut(id, label) {
      this.addPort(new RJD.DefaultPortModel(false, id, label));
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.image = object.image;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      image: this.image
    });
  }

  getInPorts() {
    return _.filter(this.ports, portModel => !portModel.out);
  }
}
