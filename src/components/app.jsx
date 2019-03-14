import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Diagram from './diagram';
import PropsPanel from './propspanel';
import ConsolePanel from './consolepanel';
import NodesPanel from './nodespanel';

import '../style/test.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                name: 'model1',
                nodes: [
                    { id: 1, name: 'node 1', ports: [1,2] },
                    { id: 2, name: 'node 2', ports: [1] }
                ]
            },
            selectedNode: null
        }
    }

    updateModel(node) {
        let updatedModel = Object.assign({}, this.state.model);

        const filtered = updatedModel.nodes.filter((item) => {
            return item.id !== node.id
        });

        updatedModel.nodes = filtered;
        updatedModel.nodes.push(node);

        this.setState({
            selectedNode: node,
            model: updatedModel
        });
    }

    onDiagramChanged(node) {
        this.setState({
            selectedNode: node
        });
    }

    onModelChanged(model) {
        this.setState({
            model: model
        });
    }

    render() {
        return (
            <div className="app-container">
                <div className="left-panel">
                    <NodesPanel />
                </div>
                <Diagram
                    selectedNode={this.state.selectedNode}
                    model={this.state.model}
                    onChange={this.onDiagramChanged.bind(this)}
                    onModelChanged={this.onModelChanged.bind(this)}/>

                <div className="right-panel">
                    <PropsPanel
                        selectedNode={this.state.selectedNode}
                        onSelectionChanged={this.updateModel.bind(this)} />
                    <ConsolePanel model={this.state.model} />
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);