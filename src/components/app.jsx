import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Diagram from './diagram';
import PropsPanel from './propspanel';
import ConsolePanel from './consolepanel';
import NodesPanel from './nodespanel';

import * as RJD from 'react-js-diagrams';
import { engine } from './engine';
import { InputNodeModel } from './nodes/input/InputNodeModel';


import '../style/test.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: null,
            selectedNode: null
        }
    }

    updateModel(node) {
        this.setState({
            selectedNode: node
        });

    }

    onModelChanged(model, node) {
        this.setState({
            model: model,
            selectedNode: node,
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
                    onModelChanged={this.onModelChanged.bind(this)}/>

                <div className="right-panel">
                    <PropsPanel
                        model={this.state.model}
                        selectedNode={this.state.selectedNode}
                        onSelectionChanged={this.onModelChanged.bind(this)} />
                    <ConsolePanel model={this.state.model} />
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);