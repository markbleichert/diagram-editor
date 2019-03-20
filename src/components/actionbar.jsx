import React from 'react';

class ActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedModels: [],
            selectedId: ''
        }
    }

    componentDidMount() {
        const models = this.getAllFromStorage();
        this.setState({
            savedModels: models,
            selectedId: models[0].id
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedId: nextProps.model.id
        })
    }

    onSaveModel(e) {
        const model = this.props.model;
        localStorage.setItem(model.id, JSON.stringify(model));

        this.setState({
            savedModels: this.getAllFromStorage()
        });
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

    findModel(id) {
        return this.state.savedModels.find((model) => {
            return model.id === id;
        });
    }

    onSelectChange(e) {
        const model = this.findModel(e.target.value);

        this.props.updateModel(model, model.nodes[0]);
    }

    renderSelect() {
        return (
            <select value={this.state.selectedId} onChange={this.onSelectChange.bind(this)}>
                {this.state.savedModels.map((model, index) => <option key={index} value={model.id}>{model.id}</option>)}
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