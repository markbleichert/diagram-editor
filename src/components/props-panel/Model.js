class Model {
    constructor(model) {
        this.model = model;
    }

    getNodeById(id) {
        const node = this.model.nodes.find((node) => {
            return node.id === id;
        });

        return node ? new Node(node) : null;
    }

    serialize() {
        return this.model;
    }
}

class Node {
    constructor(node) {
        this.node = node;
    }

    getPortById(id) {
        const port =  this.node.ports.find((port) => {
            return port.id === id;
        });

        return port ? new Port(port) : null;
    }

    addPort(port) {
        this.node.ports.push(port);
    }

    setName(value) {
        this.node.name = value;
    }

    setColor(value) {
        this.node.color = value;
    }

    setImageSrc(value) {
        if (!this.node.image) {
            this.node.image = {};
        }

        this.node.image.src = value;
    }

    setImageAlt(value) {
        if (!this.node.image) {
            this.node.image = {};
        }

        this.node.image.alt = value;
    }

    setProperty(key, value) {
        switch(key) {
            case 'name':
                this.setName(value);
                break;
            case 'color':
                this.setColor(value);
                break;
            case 'src':
                this.setImageSrc(value);
                break;
            case 'alt':
                this.setImageAlt(value);
                break;
            default:
                console.warn(`Can not set Node property ${key}`);
        }
    }

    serialize() {
        return this.node;
    }
}

class Port {
    constructor(port) {
        this.port = port;
    }

    setLabel(value) {
        this.port.label = value;
    }

    setImage(src, alt='') {
        if (!this.port.image) {
            this.port.image = {};
        }

        this.port.image.src = src;
        this.port.image.alt = alt;

    }

    setProperty(key, value) {
        switch(key) {
            case 'label':
                this.setLabel(value);
                break;
            case 'image':
                this.setImage(value, '');
                break;
            default:
                console.warn(`Can not set Port property ${key}`);
        }
    }
}
export default Model;