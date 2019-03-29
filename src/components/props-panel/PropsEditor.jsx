import React from 'react';
import ReactDOM from 'react-dom';
import { InputNodeModel } from '../nodes/input/InputNodeModel';
import Port from './Port'
import Model from './Model'
import ContentEditor from './content/ContentEditor';
import NodeEditor from './node/NodeEditor';

class PropsEditor extends React.Component {
    constructor(props) {
        super(props);

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        this.element = ReactDOM.findDOMNode(this);
        this.element.addEventListener('keydown', this.onKeyDown, false);
    }

    componentWillUnmount() {
        this.element.removeEventListener('keydown', this.onKeyDown, false);
    }

    onKeyDown(e) {
        e.stopPropagation();
    }

    onNodeChange(data) {
        const model = new Model(this.props.model);
        const node = model.getNodeById(this.props.selectedNode.id);

        node.setData(data);

        this.props.updateModel(model.serialize(), node.serialize());
    }

    onContentChange(data) {
        const model = new Model(this.props.model);
        const node = model.getNodeById(this.props.selectedNode.id);

        node.setProperty('content', data);

        this.props.updateModel(model.serialize(), node.serialize());
    }

    onFocusPortOut(e) {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const value = e.target.innerText;


        const model = new Model(this.props.model);
        const node = model.getNodeById(this.props.selectedNode.id);
        const port = node.getPortById(id);

        port.setProperty(name, value);

        this.props.updateModel(this.props.model, this.props.selectedNode);
    }

    createPort() {
        const im = new InputNodeModel('input');
        im.deSerialize(this.props.selectedNode);

        const id = this.props.selectedNode.ports.length + 1;
        im.addPortOut(`out${id}`, 'label text', {
            src: './images/pas1.jpeg',
            alt: 'alt text'
        });

        const node = im.serialize();

        return  node.ports.pop();

    }
    onAddPort() {
        const model = new Model(this.props.model);
        const node = model.getNodeById(this.props.selectedNode.id);

        const port = this.createPort();
        node.addPort(port);

        this.props.updateModel(model.serialize(), node.serialize());
    }

    renderPort(port) {
        return (
            <Port key={port.id}
                id={port.id}
                label={port.label}
                image={port.image}
                onBlur={this.onFocusPortOut.bind(this)} />
        );
    }
    renderPorts(ports) {
        const tables = Object.keys(ports)
            .filter((key) => !ports[key].in)
            .map((prop) => this.renderPort(ports[prop]));

        if (tables.length > 0) {
            return (
                <div>
                    <div className="ports-header">
                        <label>Ports</label>
                        <button className="add-port-button"
                            onClick={this.onAddPort.bind(this)}>+</button>
                    </div>
                    { tables }
                </div>
            );
        }

        return null;
    }

    render() {
        const { selectedNode } = this.props;

        if (!selectedNode) {
            return (
                <div className="props-panel">
                    <div className="container">
                        no selection..
                    </div>
                </div>
            );
        }

        return (
            <div className="props-panel">
                <div className="container">
                    <NodeEditor data={selectedNode} onChange={this.onNodeChange.bind(this)}/>
                    <ContentEditor data={selectedNode.content} onChange={this.onContentChange.bind(this)}/>
                    { this.renderPorts(selectedNode.ports) }
                </div>
            </div>
        );
    }
}

export default PropsEditor;