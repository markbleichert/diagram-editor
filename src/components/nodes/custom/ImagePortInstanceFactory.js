import { ImagePortModel } from './ImagePortModel';
import { AbstractInstanceFactory } from '../../../../lib/AbstractInstanceFactory';

export class ImagePortFactory extends AbstractInstanceFactory {
    constructor() {
        super('ImagePortModel');
    }

    getInstance() {
        return new ImagePortModel(true, 'unknown');
    }
}
