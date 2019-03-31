import React from 'react';
import { DropTarget } from 'react-dnd';
import * as RJD from '../../../lib/main';
import _ from 'lodash';

import { engine } from './engine';
import { InputNodeModel } from '../nodes/input/InputNodeModel';
import { EndpointNodeModel } from '../nodes/endpoint/EndpointNodeModel';


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
            node = new InputNodeModel('Question Node', 'rgb(192, 255, 0)', {
                title: '',
                body: '',
                video: {
                    url: ''
                },
                image: {
                    src: '',
                    alt: ''
                },
                info: {
                    title: '',
                    body: ''
                }
            });
        }

        if (item.type === 'endpoint') {
            node = new EndpointNodeModel('Endpoint Node', 'rgb(192, 255, 0)', {
                title: '',
                body: '',
                image: {
                    src: '',
                    alt: ''
                },
                link: {
                    url: '',
                    text: ''
                }
            });
        }

        node.x = x;
        node.y = y;

        diagramModel.addNode(node);

        // update the diagram with new widget
        props.updateModel(diagramModel.serializeDiagram());
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

    componentDidMount() {
        this.setModel(this.props.model);
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(this.props, nextProps)) {
            this.setModel(nextProps.model, engine);
        }
    }

    setModel(model, cb = null) {
        diagramModel = new RJD.DiagramModel();
        if (model) {
            diagramModel.deSerializeDiagram(model, engine);
        }
        engine.setDiagramModel(diagramModel);
    }

    onChangeHandler(model, action) {
        console.log(`diagram changed: ${action.type}`);

        // Ignore some events
        if (['items-copied'].indexOf(action.type) !== -1) {
            return;
        }

        // Check for canvas events
        const deselectEvts = ['canvas-click', 'canvas-drag', 'items-selected', 'items-drag-selected', 'items-moved'];
        if (deselectEvts.indexOf(action.type) !== -1) {
            return this.props.updateModel(model, action.model);
        }

        // Check for single selected items
        if (['node-selected', 'node-moved'].indexOf(action.type) !== -1) {
            return this.props.updateModel(model, action.model);
        }
        // e.g.: items-deleted
        this.props.updateModel(model);
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
