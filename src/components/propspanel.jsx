import React from 'react';
import { TwitterPicker } from 'react-color';
import { InputNodeModel } from './nodes/input/InputNodeModel';

class PropsPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false,
        };
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
                if (updatableNode[key] !== nextNode[key]) {
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

    renderInputs(selectedNode) {
        return this.getSimpleProps(selectedNode).map((key) => {
            return (
                <div key={key} className="input-row">
                    <label>
                        {key}
                        { (key === 'color') ? this.renderColorPicker(key): null }
                    </label>
                    <div data-key={key}
                        contentEditable="true"
                        onBlur={this.onFocusInputOut.bind(this)}
                        suppressContentEditableWarning={true}>
                        {selectedNode[key]}</div>
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
                    <div data-key={ports[key].id}
                         contentEditable="true"
                         onBlur={this.onFocusPortOut.bind(this)}
                         suppressContentEditableWarning={true}>
                        {ports[key].label}</div>
                </div>
            )
        });
    }

    handleClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose() {
        this.setState({ displayColorPicker: false })
    }

    handleColorClick(key, e) {
        this.onFocusInputOut({
            target: {
                innerText: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b})`,
                getAttribute: () => {
                    return key;
                }
            }
        });
    }

    renderColorPicker(key) {
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }

        return (
            <span className="color-picker">
                <button onClick={ this.handleClick.bind(this) }>...</button>
                { this.state.displayColorPicker ? <div style={ popover }>
                    <div style={ cover } onClick={ this.handleClose.bind(this) }/>
                    <TwitterPicker onChange={ this.handleColorClick.bind(this, key) }/>
                </div> : null }
            </span>
        )
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

export default PropsPanel;