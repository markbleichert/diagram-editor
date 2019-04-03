import React from 'react';

class ActionBar extends React.Component {
    constructor(props) {
        super(props);
    }

    onNewModel(e) {
        this.props.modelCreated();
    }

    onRemoveModel(e) {
        this.props.removeModel(e.target.value);
    }

    onSelectionChanged(e) {
        this.props.selectionChanged(e.target.value);
    }

    render() {
        return (
            <div className="actions">
                <button onClick={this.onNewModel.bind(this)}>New Model</button>
                <button value={this.props.selectedId} onClick={this.onRemoveModel.bind(this)}>Delete Model</button>
                <select value={this.props.selectedId} onChange={this.onSelectionChanged.bind(this)}>
                    {this.props.savedModels.map((model, index) => <option key={index} value={model.id}>{model.name}</option>)}
                </select>
            </div>
        );
    }
}

export default ActionBar;