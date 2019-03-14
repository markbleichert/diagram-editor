import React from 'react';
import { DropTarget } from 'react-dnd';
import * as RJD from 'react-js-diagrams';
import { engine } from './engine';
import { InputNodeModel } from './nodes/input/InputNodeModel';

// Setup the diagram model
let diagramModel = new RJD.DiagramModel();

const target = {
    drop(props, monitor) {
        const { x: pageX, y: pageY } = monitor.getSourceClientOffset();
        const { left = 0, top = 0 } = engine.canvas.getBoundingClientRect();
        const { offsetX, offsetY } = engine.diagramModel;
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
        props.onModelChanged(diagramModel.serializeDiagram(), null, () => {
            engine.setDiagramModel(diagramModel);
            engine.forceUpdate();
        });
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

    onChangeHandler(model, action) {
        console.log(action);

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
