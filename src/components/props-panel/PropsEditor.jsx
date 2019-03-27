import React from 'react';
import ReactDOM from 'react-dom';
import { InputNodeModel } from '../nodes/input/InputNodeModel';
import ColorPicker from './ColorPicker';
import EditableInput from './EditableInput';
import Port from './Port'

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

    updateChanges(nextNode) {
        const { nodes } = this.props.model;

        const updatableNode = nodes.find((node) => {
            return node.id === nextNode.id;
        });

        const updatableKeys = Object.keys(nextNode).filter((key) => {
            return (typeof nextNode[key] === 'string' || typeof nextNode[key] === 'number');
        });

        Object.keys(updatableNode).forEach((key) => {
            if(updatableKeys.indexOf(key) > -1) {
                // update only when changed
                if (updatableNode[key] != nextNode[key]) {
                    if (typeof updatableNode[key] === 'number') {
                        updatableNode[key] = Number(nextNode[key]);
                    } else {
                        updatableNode[key] = nextNode[key];
                    }

                    console.log(`key ${key} update..`);
                }
            }
        });
        // todo: this always returns a model whether its updated or not
        // this makes the change check useless.
        return this.props.model;
    }

    onFocusInputOut(e) {
        const name = e.target.getAttribute('data-name');

        // create change object and update key value
        const changeObject = Object.assign({}, this.props.selectedNode);
        changeObject[name] = e.target.innerText;

        // update changes with model node
        const updateModel = this.updateChanges(changeObject);

        // model is updated - update diagram !
        this.props.updateModel(updateModel, changeObject);
    }

    onFocusPortOut(e) {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const value = e.target.innerText;

        const nodeInModel = this.props.model.nodes.find((node) => {
            return (node.id === this.props.selectedNode.id);
        });

        const portInModel = nodeInModel.ports.find((port) => {
            return port.id === id;
        });

        if (name === 'image') {
            if (portInModel.image) {
                portInModel.image.src = value;
            } else {
                console.warn('property image not found..');
            }
        } else {
            portInModel[name] = value;
        }

        this.props.updateModel(this.props.model, nodeInModel);
    }

    onAddPort() {
        const im = new InputNodeModel('input');
        im.deSerialize(this.props.selectedNode);

        const id = this.props.selectedNode.ports.length + 1;
        im.addPortOut(`out${id}`, 'label text', {
            src: './images/pas1.jpeg',
            alt: 'no-alt'
        });

        const node = im.serialize();

        const lastPort = node.ports.pop();

        const nodeInModel = this.props.model.nodes.find((node) => {
            return (node.id === this.props.selectedNode.id);
        });

        nodeInModel.ports.push(lastPort);

        this.props.updateModel(this.props.model, nodeInModel);
    }

    getSimpleProps(selectedNode) {
        return Object.keys(selectedNode).filter((key) => {
            const value =  selectedNode[key];
            return ( typeof value === 'string' || typeof value === 'number');
        });
    }

    renderInputLabel(key) {
        if (key === 'color') {
            return (
                <label>
                    <span>{ key }</span>
                    <ColorPicker onChange={this.handleColorClick.bind(this, key)}/>
                </label>
            );
        }

        return (<label>{ key }</label>);
    }

    renderInputs(selectedNode) {
        const rows = this.getSimpleProps(selectedNode).map((key) => {
            return (
                <tr key={key}>
                    <th>{ this.renderInputLabel(key) }</th>
                    <td>
                        <EditableInput
                            id={selectedNode.id}
                            value={selectedNode[key]}
                            name={key}
                            onBlur={this.onFocusInputOut.bind(this)}
                        />
                    </td>
                </tr>
            );
        });

        if (rows.length > 0) {
            return (
                <table>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
            );
        }
        return null;
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
    renderPorts(selectedNode) {
        const ports = selectedNode.ports;

        const tables = Object.keys(ports)
            .filter((key) => !ports[key].in)
            .map((prop) => this.renderPort(ports[prop]));

        if (tables.length > 0) {
            return (
                <div>
                    <label>Ports</label>
                    <button
                        onClick={this.onAddPort.bind(this)}
                        className="add-port-button">+</button>
                    { tables }
                </div>
            );
        }

        return null;
    }

    handleColorClick(key, color) {
        this.onFocusInputOut({
            target: {
                innerText: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                getAttribute: (key) => {
                    if (key === 'data-name') {
                        return 'color';
                    }
                }
            }
        });
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
                    { this.renderInputs(selectedNode) }
                    { this.renderPorts(selectedNode) }
                </div>
            </div>
        )
    }
}

export default PropsEditor;