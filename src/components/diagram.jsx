import React from 'react';
import { DropTarget } from 'react-dnd';
import * as RJD from 'react-js-diagrams';

const target = {
    drop(props, monitor, component ) {

        const { x: pageX, y: pageY } = monitor.getSourceClientOffset();
        const item = monitor.getItem();

        console.log(item);
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

    getSelectedNodeName() {
        const { selectedNode } = this.props;

        if (selectedNode) {
            return selectedNode.name;
        }

        return null;
    }

    parsePorts(ports) {
        return ports.map((port, index) => {
            return (
                <div key={index} className="port">port-{port}</div>
            )
        })
    }
    onNodeClick(node, e) {
        e.stopPropagation();
        this.props.onChange(node);
    }

    onNodeRemove(node) {
        const okNodes = this.props.model.nodes.filter((item) => {
           return item !== node;
        });

        // create a new model containing all but the removable node
        const newModel = Object.assign({}, this.props.model);
        newModel.nodes = okNodes;

        this.props.onModelChanged(newModel);
    }
    parseModel() {
        return this.props.model.nodes.map((node, index) => {
            return (
                <div key={index} className="node" onClick={this.onNodeClick.bind(this, node)}>
                    <div className="remove-node" onClick={this.onNodeRemove.bind(this, node)}>x</div>
                    <div>{node.name}</div>
                    <div className="ports">
                        {this.parsePorts(node.ports)}
                    </div>
                </div>
            )
        });
    }

    render() {
        const { connectDropTarget } = this.props;

        return connectDropTarget (
            <div className="diagram" onClick={this.onNodeClick.bind(this, null)}>
                <div className="selected-node">SelectedNode: { this.getSelectedNodeName() }</div>
                <div className="parsed-nodes">
                    <div>{this.parseModel()}</div>
                </div>
            </div>
        )
    }
}

export default DropTarget('node-source', target, collect)(Diagram);
