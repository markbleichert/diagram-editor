import _ from 'lodash';
import * as RJD from '../../../../lib/main';
import { ImagePortModel } from '../custom/ImagePortModel'

export class InputNodeModel extends RJD.NodeModel {
    constructor(name = 'Untitled', color = 'rgb(192, 255, 0)', content) {
        super('input');
        this.addPort(new RJD.DefaultPortModel(true, 'input', 'In'));
        this.addPort(new ImagePortModel(false, 'out1', 'Out 1'));
        this.addPort(new ImagePortModel(false, 'out2', 'Out 2'));

        this.name = name;
        this.color = color;
        this.content = content;
    }

    addPortOut(id, label, value, image) {
        this.addPort(new ImagePortModel(false, id, label, value, image));
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
