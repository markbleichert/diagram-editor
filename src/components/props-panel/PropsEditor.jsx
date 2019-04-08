import React from 'react';
import ReactDOM from 'react-dom';
import Model from './Model'
import ContentEditor from './content/ContentEditor';
import NodeEditor from './node/NodeEditor';
import PortsEditor from './ports/PortsEditor';
import { InputNodeModel } from '../nodes/input/InputNodeModel';

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
        // this is a hack to stop keydown events
        // attached to window in diagram component
        e.stopPropagation();
    }

    onModelNameChange(data) {
        const model = new Model(this.props.model);
        model.setName(data.name);

        this.props.updateModel(model.serialize());
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

        node.setContent(data);

        this.props.updateModel(model.serialize(), node.serialize());
    }

    onPortChange(data) {
        const model = new Model(this.props.model);
        const node = model.getNodeById(this.props.selectedNode.id);
        const port = node.getPortById(data.id);

        port.setData(data);

        this.props.updateModel(model.serialize(), node.serialize());
    }

    createPort() {
        const im = new InputNodeModel('input');
        im.deSerialize(this.props.selectedNode);

        const id = Object.keys(this.props.selectedNode.ports).length;
        im.addPortOut(`out${id}`);

        const node = im.serialize();

        return node.ports.pop();

    }

    onPortAdd() {
        const model = new Model(this.props.model);
        const node = model.getNodeById(this.props.selectedNode.id);
        const port = this.createPort();

        node.addPort(port);

        this.props.updateModel(model.serialize(), node.serialize());
    }

    render() {
        const { selectedNode, model } = this.props;

        if (!selectedNode) {
            return (
                <div className="props-panel">
                    <div className="container max">
                        <NodeEditor data={model} onChange={this.onModelNameChange.bind(this)}/>
                    </div>
                </div>
            );
        }

        return (
            <div className="props-panel">
                <div className="container">
                    <NodeEditor data={selectedNode} onChange={this.onNodeChange.bind(this)}/>
                    <ContentEditor data={selectedNode.content} onChange={this.onContentChange.bind(this)}/>
                    <PortsEditor
                        data={selectedNode.ports}
                        onAdd={this.onPortAdd.bind(this)}
                        onChange={this.onPortChange.bind(this)} />
                </div>
            </div>
        );
    }
}

export default PropsEditor;