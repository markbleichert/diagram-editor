import React from 'react';
import { DropTarget } from 'react-dnd';
import * as RJD from 'react-js-diagrams';
import _ from 'lodash';
import { engine } from './engine';
import { InputNodeModel } from './nodes/input/InputNodeModel';

// Setup the diagram model
let diagramModel = new RJD.DiagramModel();

const target = {
    drop(props, monitor) {
        const {x: pageX, y: pageY} = monitor.getSourceClientOffset();
        const {left = 0, top = 0} = engine.canvas.getBoundingClientRect();
        const {offsetX, offsetY} = engine.diagramModel;
        const x = pageX - left - offsetX;
        const y = pageY - top - offsetY;
        const item = monitor.getItem();

        let node;
        if (item.type === 'question') {
            node = new InputNodeModel('Question Node');
        }
        if (item.type === 'endpoint') {
            node = new InputNodeModel('Endpoint Node');
        }

        node.x = x;
        node.y = y;

        diagramModel.addNode(node);

        // update the diagram with new widget
        props.onModelChanged(diagramModel.serializeDiagram());
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Diagram extends React.Component {
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
                if (nodeInModel[key] !== nextNode[key]) {
                    nodeInModel[key] = nextNode[key]
                }
            }
        });

        return this.props.model;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.selectedNode && this.props.selectedNode) {

            if (this.props.selectedNode.name !== nextProps.selectedNode.name) {
                const newModel = this.updateChanges(nextProps.selectedNode);
                return this.props.onModelChanged(newModel, nextProps.selectedNode);

            }
        }
        // if (!_.isEqual(this.props, nextProps)) {
            this.setModel(nextProps.model, engine);
        // }
    }

    setModel(model) {
        console.log('SET NEW MODEL');
        diagramModel = new RJD.DiagramModel();
        if (model) {
            diagramModel.deSerializeDiagram(model, engine);
        }
        engine.setDiagramModel(diagramModel);
    }

    onChangeHandler(model, action) {
        console.log(model, action);

        // Check for canvas events
        const deselectEvts = ['canvas-click', 'canvas-drag', 'items-selected', 'items-drag-selected', 'items-moved'];
        if (deselectEvts.indexOf(action.type) !== -1) {
            return this.props.onModelChanged(model, action.model);
        }

        // Check for single selected items
        if (['node-selected', 'node-moved'].indexOf(action.type) !== -1) {
            return this.props.onModelChanged(model, action.model);
        }

        this.props.onModelChanged(model);
    }

    render() {
        const { connectDropTarget } = this.props;

        return connectDropTarget (
            <div className="diagram">
                <RJD.DiagramWidget diagramEngine={engine} onChange={this.onChangeHandler.bind(this)}/>
            </div>
        )
    }
}

export default DropTarget('node-source', target, collect)(Diagram);
