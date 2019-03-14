import React from 'react';
import Input from './input';

class PropsPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    onFocusOut(e) {
        const clone = Object.assign({}, this.props.selectedNode);
        const key = e.target.getAttribute('data-key');
        clone[key] = e.target.innerText;
        this.props.onSelectionChanged(clone);
    }

    getSimpleProps(selectedNode) {
        return Object.keys(selectedNode).filter((key) => {
            const value =  selectedNode[key];
            return ( typeof value === 'string' || typeof value === 'number');
        });
    }
    renderInputs(selectedNode) {
        return this.getSimpleProps(selectedNode).map((key) => {
            return (
                <div key={key} className="input-row">
                    <label>{key}</label>
                    <div data-key={key}
                        contentEditable="true"
                        onBlur={this.onFocusOut.bind(this)}
                        suppressContentEditableWarning={true}>
                        {selectedNode[key]}</div>
                </div>
            );
        });
    }

    render() {
        const { selectedNode } = this.props;

        return (
            <div className="props-panel">
                <div className="container">
                { selectedNode? this.renderInputs(selectedNode) : 'No selection made..' }
                </div>
            </div>
        )
    }
}

export default PropsPanel;