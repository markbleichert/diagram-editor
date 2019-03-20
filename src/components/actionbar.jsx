import React from 'react';

class ActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            selectedId: null
        }
    }

    componentDidMount() {
        const models = this.getAllFromStorage();
        this.setState({
            models: models,
            selectedId: models[0].id
        });
    }

    onSaveModel(e) {
        const model = this.props.model;
        localStorage.setItem(model.id, JSON.stringify(model));
    }

    onLoadModel(e) {
        const model = this.getAllFromStorage()[0];
        this.props.updateModel(model, model.nodes[0]);
    }

    parseItem(item) {
        let parsed = null;
        try {
            parsed = JSON.parse(item);
        } catch(e) {
            console.info(`Can not parse ${item}`)
        }
        return parsed;
    }

    getAllFromStorage() {
        var models = [];
        for (var i = 0; i<localStorage.length; i++) {
            const item = this.parseItem(localStorage.getItem(localStorage.key(i)))
            if (item) {
                models.push(item);
            }
        }
        return models;
    }

    onSelectChange(e) {
        this.setState({
            selectedId: e.target.value
        });
    }

    renderSelect() {
        return (
            <select value={this.state.selectedId} onChange={this.onSelectChange.bind(this)}>
                {this.state.models.map((model) => <option key={model.id} value={model.id}>{model.id}</option>)}
            </select>
        );
    }
    render() {
        return (
            <div className="actions">
                <button onClick={this.onSaveModel.bind(this)}>Save Model</button>
                <button onClick={this.onLoadModel.bind(this)}>Load Model</button>
                { this.renderSelect()}
            </div>
        );
    }
}

export default ActionBar;