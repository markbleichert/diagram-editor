import React from 'react';
import Input from './input';

class PropsPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    updateChanges(nextNode) {
        const { nodes } = this.props.model;

        const updatableNode = nodes.find((node) => {
            return node.id === nextNode.id;
        });

        const updatableKeys = Object.keys(nextNode).filter((key) => {
            return (typeof nextNode[key] === 'string' || typeof nextNode[key] === 'number');
        });

        Object.keys(updatableNode).forEach((key) => {
            if(updatableKeys.indexOf(key) > -1) {
                // update only when changed
                if (updatableNode[key] !== nextNode[key]) {
                    updatableNode[key] = nextNode[key]
                }
            }
        });

        return this.props.model;
    }

    onFocusOut(e) {
        const key = e.target.getAttribute('data-key');

        // create change object and update key value
        const changeObject = Object.assign({}, this.props.selectedNode);
        changeObject[key] = e.target.innerText;

        // update changes with model node
        const updateModel = this.updateChanges(changeObject);

        // model is updated - update diagram !
        this.props.onSelectionChanged(updateModel, changeObject);
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