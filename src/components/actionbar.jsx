import React from 'react';

class ActionBar extends React.Component {
    constructor(props) {
        super(props);
    }

    onNewModel(e) {
        this.props.modelCreated();
    }

    onSelectionChanged(e) {
        this.props.selectionChanged(e.target.value);
    }

    render() {
        return (
            <div className="actions">
                <button onClick={this.onNewModel.bind(this)}>New Model</button>
                <select value={this.props.selectedId} onChange={this.onSelectionChanged.bind(this)}>
                    {this.props.savedModels.map((model, index) => <option key={index} value={model.id}>{model.id}</option>)}
                </select>
            </div>
        );
    }
}

export default ActionBar;