import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Diagram from './diagram';
import PropsPanel from './propspanel';
import ConsolePanel from './consolepanel';
import NodesPanel from './nodespanel';
import modeldata from './data';

import '../style/test.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: modeldata,
            selectedNode: modeldata.nodes[0]
        }
    }

    onUpdateModel(model, node) {
        this.setState({
            model: model,
            selectedNode: node
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
                    updateModel={this.onUpdateModel.bind(this)}/>

                <div className="right-panel">
                    <PropsPanel
                        model={this.state.model}
                        selectedNode={this.state.selectedNode}
                        updateModel={this.onUpdateModel.bind(this)} />
                    <ConsolePanel model={this.state.model} />
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);