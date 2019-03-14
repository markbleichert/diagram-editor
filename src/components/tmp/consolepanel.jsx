import React, { Component } from 'react';
import * as RJD from 'react-js-diagrams';
import { engine } from './engine';


class ConsolePanel extends Component {
    constructor(props) {
        super(props);
    }

    serialize() { console.log('####');
        const { model } = this.props;
        return JSON.stringify(model.serialize(), null, 2);
    }

    render() {
        console.log('render console panel..');

        if (!this.props.model) {
            return <div className="console-panel" />;
        }

        return (
            <div className="console-panel">
                <pre>{this.serialize()}</pre>
            </div>
        )
    }
}

export default ConsolePanel;