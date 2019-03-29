import React from 'react';
import ReactDOM from 'react-dom';
import { InputNodeModel } from '../nodes/input/InputNodeModel';
import ColorPicker from './ColorPicker';
import EditableInput from './EditableInput';
import Port from './Port'
import Model from './Model'
import ContentEditor from './content/ContentEditor';

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

    onContentChange(data) {
        const model = new Model(this.props.model);
        const node = model.getNodeById(this.props.selectedNode.id);

        node.setProperty('content', data);

        this.props.updateModel(model.serialize(), node.serialize());
    }

    onFocusInputOut(e) {
        const name = e.target.getAttribute('data-name');

        const model = new Model(this.props.model);
        const node = model.getNodeById(this.props.selectedNode.id);

        node.setProperty(name, e.target.innerText);

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

    renderImageInputs(image) {

        if (image) {
            return (
                <table>
                    <tbody>
                    <tr>
                        <th>
                            <label>src</label>
                        </th>
                        <td>
                            <EditableInput
                                id={selectedNode.id}
                                value={image.src}
                                name="src"
                                onBlur={this.onFocusInputOut.bind(this)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>alt</label>
                        </th>
                        <td>
                            <EditableInput
                                id={selectedNode.id}
                                value={image.alt}
                                name="alt"
                                onBlur={this.onFocusInputOut.bind(this)}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        }
        return null;
    }

    renderSimpleInputs(selectedNode) {
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
                    <thead>
                        <tr><th colSpan="2">root</th></tr>
                    </thead>
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
                    { this.renderSimpleInputs(selectedNode) }
                    { this.renderImageInputs(selectedNode.image) }
                    <ContentEditor data={selectedNode.content} onChange={this.onContentChange.bind(this)}/>
                    { this.renderPorts(selectedNode.ports) }
                </div>
            </div>
        );
    }
}

export default PropsEditor;