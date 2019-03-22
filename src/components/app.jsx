import React from 'react';
import * as RJD from 'react-js-diagrams';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Diagram from './diagram';
import PropsEditor from './props-panel/PropsEditor';
import ConsolePanel from './consolepanel';
import NodesPanel from './nodespanel';
import ActionBar from './actionbar';
import Storage from './storage';
import Preview from './preview';

import '../style/test.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        const models = Storage.getAllFromStorage();

        this.state = {
            savedModels: models,
            model: models[0],
            selectedNode: null
        }
    }

    onModelCreated() {
        const diagramModel = new RJD.DiagramModel();

        Storage.saveToStorage(diagramModel);

        this.setState({
            model: diagramModel,
            selectedNode: null,
            savedModels: Storage.getAllFromStorage(),
            selectedId: diagramModel.id
        });
    }

    onSelectionChanged(selectedId) {
        const model = Storage.getFromStorage(selectedId);
        this.setState({
            model: model,
            selectedId: selectedId
        });
    }

    onUpdateModel(model, node) {
        this.setState({
            model: model,
            selectedNode: node
        }, () => Storage.saveToStorage(model));
    }

    render() {
        return (
            <div className="app-container">
                <div className="actionbar">
                    <ActionBar
                        selectedId={this.state.model.id}
                        savedModels={this.state.savedModels}
                        selectionChanged={this.onSelectionChanged.bind(this)}
                        modelCreated={this.onModelCreated.bind(this)}
                    />
                </div>
                <div className="left-panel">
                    <NodesPanel />
                </div>
                <div className="diagram-panel">
                    <Diagram
                        selectedNode={this.state.selectedNode}
                        model={this.state.model}
                        updateModel={this.onUpdateModel.bind(this)}/>
                    <div className="preview-panel">
                        <Preview model={this.state.model} />
                    </div>
                </div>
                <div className="right-panel">
                    <PropsEditor
                        model={this.state.model}
                        selectedNode={this.state.selectedNode}
                        updateModel={this.onUpdateModel.bind(this)} />
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);