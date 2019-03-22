import React from 'react';
import { InputNodeModel } from '../nodes/input/InputNodeModel';
import ColorPicker from './ColorPicker';
import EditableInput from './EditableInput';

class PropsEditor extends React.Component {
    constructor(props) {
        super(props);
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

        return this.props.model;
    }

    onFocusInputOut(e) {
        const key = e.target.getAttribute('data-key');

        // create change object and update key value
        const changeObject = Object.assign({}, this.props.selectedNode);
        changeObject[key] = e.target.innerText;

        // update changes with model node
        const updateModel = this.updateChanges(changeObject);

        // model is updated - update diagram !
        this.props.updateModel(updateModel, changeObject);
    }

    onFocusPortOut(e) {
        const key = e.target.getAttribute('data-key');
        const value = e.target.innerText;

        const nodeInModel = this.props.model.nodes.find((node) => {
            return (node.id === this.props.selectedNode.id);
        });

        const portInModel = nodeInModel.ports.find((port) => {
            return port.id === key;
        });

        // update port label in model
        portInModel.label = value;

        this.props.updateModel(this.props.model, nodeInModel);
    }

    onAddPort() {
        const im = new InputNodeModel('input');
        im.deSerialize(this.props.selectedNode);

        const id = this.props.selectedNode.ports.length + 1;
        im.addPortOut(`out${id}`, 'label text');

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
        return this.getSimpleProps(selectedNode).map((key) => {
            return (
                <div key={key} className="input-row">
                    { this.renderInputLabel(key) }
                    <EditableInput
                        value={selectedNode[key]}
                        name={key}
                        onBlur={this.onFocusInputOut.bind(this)}
                    />
                </div>
            );
        });
    }

    renderPorts(selectedNode) {
        const ports = selectedNode.ports;

        return Object.keys(ports).map((key) => {
            return (
                <div key={key} className="input-row">
                    <label>{ ports[key].name }</label>
                    <EditableInput
                        value={ports[key].label}
                        name={ports[key].id}
                        onBlur={this.onFocusPortOut.bind(this)}
                    />
                </div>
            )
        });
    }

    handleColorClick(key, color) {
        this.onFocusInputOut({
            target: {
                innerText: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                getAttribute: () => key
            }
        });
    }

    render() {
        const { selectedNode } = this.props;

        if (!selectedNode) {
            return <div className="props-panel">no selection..</div>;
        }

        return (
            <div className="props-panel">
                <div className="container">
                    <div className="props-section">
                        { this.renderInputs(selectedNode) }
                    </div>
                    <div className="ports-section">
                        <div>
                            <label>Ports:</label>
                            <button
                                onClick={this.onAddPort.bind(this)}
                                className="add-port-button">+</button>
                        </div>
                        {this.renderPorts(selectedNode) }
                    </div>
                </div>
            </div>
        )
    }
}

export default PropsEditor;