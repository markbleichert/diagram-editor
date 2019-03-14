import React, { Component } from 'react';
import * as RJD from 'react-js-diagrams';
import { engine } from './engine';


class WidgetPanel extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.onClick(data);
    }

    render() {
        return (
            <form className="widget-panel" onSubmit={this.handleSubmit.bind(this)}>
                <input name="name" type="text" />
                <input name="port" type="text" />
                <input name="id" type="text" />
                <button>Add</button>
            </form>
        )
    }
}

export default WidgetPanel;