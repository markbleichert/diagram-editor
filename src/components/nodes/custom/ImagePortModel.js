import { PortModel } from '../../../../lib/Common';

export class ImagePortModel extends PortModel {
    constructor(isInput, name, label = 'untitled', image = { src: '', alt: '' }) {
        super(name);
        this.in = isInput;
        this.label = label || name;
        this.image = image;
    }

    deSerialize(object) {
        super.deSerialize(object);
        this.in = object.in;
        this.label = object.label;
        this.image = object.image;
    }

    serialize() {
        return {
            ...super.serialize(),
            in: this.in,
            label: this.label,
            image: this.image
        };
    }
}
