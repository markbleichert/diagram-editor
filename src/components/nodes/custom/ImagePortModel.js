import { PortModel } from '../../../../lib/Common';

export class ImagePortModel extends PortModel {
    constructor(isInput, name, label = 'untitled', value = '', image = { src: '', alt: '' }) {
        super(name);
        this.in = isInput;
        this.label = label;
        this.value = value;
        this.image = image;
    }

    deSerialize(object) {
        super.deSerialize(object);
        this.in = object.in;
        this.label = object.label;
        this.value = object.value;
        this.image = object.image;
    }

    serialize() {
        return {
            ...super.serialize(),
            in: this.in,
            label: this.label,
            value: this.value,
            image: this.image
        };
    }
}
