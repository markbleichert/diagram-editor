import React from 'react';
import DownloadModel from './Modal';

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
            <div className="actionbar">
                <button className="fa fa-plus-circle" onClick={this.onNewModel.bind(this)}>&nbsp;&nbsp;</button>
                <button className="fa fa-minus-circle" value={this.props.selectedId} onClick={this.onRemoveModel.bind(this)}>&nbsp;&nbsp;</button>
                <DownloadModel data={this.props.data} />

                <select value={this.props.selectedId} onChange={this.onSelectionChanged.bind(this)}>
                    {this.props.savedModels.map((model, index) => <option key={index} value={model.id}>{model.name}</option>)}
                </select>
            </div>
        );
    }
}

export default ActionBar;