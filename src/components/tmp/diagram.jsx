import React, { Component } from 'react';
import * as RJD from 'react-js-diagrams';
import { engine } from './engine';
import WidgetPanel from './widgetpanel';
import ConsolePanel from './consolepanel';

import '../style/test.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.diagramModel = new RJD.DiagramModel();
    }

    componentDidMount() {
        const { model } = this.props;
        if (model) {
            this.setModel(model);
        }
    }

    setModel(model) {
        let diagramModel = this.diagramModel;

        diagramModel = new RJD.DiagramModel();
        if (model) {
            diagramModel.deSerializeDiagram(model, engine);
        }
        engine.setDiagramModel(diagramModel);
    }

    createNode(options) {
        const { name, color, x, y } = options;
        var node = new RJD.DefaultNodeModel(name, color);
        node.x = x;
        node.y = y;
        return node;
    }

    createPort(node, options) {
        const { isInput, id, name } = options;
        return node.addPort(new RJD.DefaultPortModel(isInput, id, name));
    }

    linkNodes(port1, port2) {
        const link = new RJD.LinkModel();
        link.setSourcePort(port1);
        link.setTargetPort(port2);
        return link;
    }

    onClickHandler(data) {
        if (this.selectedNode) {
            const port2 = this.createPort(this.selectedNode, {
                isInput: false,
                id: data.get('id'),
                name: data.get('port')
            });
        }

        const newNode = this.createNode({
            name: data.get('name'),
            color: 'rgb(0, 192, 255)',
            x: 200,
            y: 200
        });

        const port1 = this.createPort(newNode, {
            isInput: false,
            id: data.get('id'),
            name: data.get('port')
        });

        this.diagramModel.addNode(newNode);

        engine.setDiagramModel(this.diagramModel);
        engine.forceUpdate();

    }

    onChangeHandler(model, action) {
        console.log(model, action);
        this.selectedNode = action.model;
    }

    render() {
        const { diagramModel } = this;

        // Create first node and port
        const node1 = this.createNode({
            name: 'Node 1',
            color: 'rgb(0, 192, 255)',
            x: 100,
            y: 100
        });
        const port1 = this.createPort(node1, {
            isInput: false,
            id: 'out-1',
            name: 'Out'
        });

        // Create second node and port
        const node2 = this.createNode({
            name: 'Node 2',
            color: 'rgb(192, 255, 0)',
            x: 400,
            y: 100
        });
        const port2 = this.createPort(node2, {
            isInput: true,
            id: 'in-1',
            name: 'In'
        });

        // Add the nodes and link to the model
        diagramModel.addNode(node1);
        diagramModel.addNode(node2);
        diagramModel.addLink(this.linkNodes(port1, port2));

        // Load the model into the diagram engine
        engine.setDiagramModel(diagramModel);

        return (
            <div className="app-container">
                <WidgetPanel onClick={this.onClickHandler.bind(this)}/>
                <RJD.DiagramWidget diagramEngine={engine} onChange={this.onChangeHandler.bind(this)}/>
                <ConsolePanel model={this.selectedNode}/>
            </div>
        );
    }
}

export default App;
