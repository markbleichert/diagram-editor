import _ from 'lodash';
import * as RJD from '../../../../lib/main';
import { ImagePortModel } from '../custom/ImagePortModel'

export class InputNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(192, 255, 0)', image) {

    super('input');
    this.addPort(new RJD.DefaultPortModel(true, 'input', 'In'));
    this.addPort(new ImagePortModel(false, 'out1', 'Out 1', {}));
    this.addPort(new ImagePortModel(false, 'out2', 'Out 2', {}));

    this.name = name;
    this.color = color;
    this.image = image;
  }

  addPortOut(id, label, image) {
      this.addPort(new ImagePortModel(false, id, label, {
        src: './images/pas1.jpeg',
        alt: 'untitled'
      }));
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
