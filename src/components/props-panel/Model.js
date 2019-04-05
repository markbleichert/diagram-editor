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

    setName(name) {
        if (name) {
            this.model.name = name;
        }
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

    setData(obj) {
        ['name', 'color'].forEach((key) => {
            if (this.node[key] !== obj[key]) {
                this.node[key] = obj[key]
            }
        });
    }

    setContent(obj) {
        this.node.content = obj;
    }

    serialize() {
        return this.node;
    }
}

class Port {
    constructor(port) {
        this.port = port;
    }

    setData(obj) {
        ['label', 'value', 'image'].forEach((key) => {
            if (this.port[key] !== obj[key]) {
                this.port[key] = obj[key]
            }
        });
    }
}
export default Model;