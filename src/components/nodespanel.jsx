import React from 'react';
import DragWrapper from './DragWrapper';
import { InputNodeWidget } from './nodes/input/InputNodeWidget';

class Node extends React.Component {
    renderNode() {
        const { type, color } = this.props;

        if (type === 'question') {
            return <InputNodeWidget node={{ name: 'QA Node' }} color={color} displayOnly/>;
        }
        if (type === 'endpoint') {
            return <InputNodeWidget className="draggable" node={{ name: 'Endpoint Node' }} displayOnly/>;
        }

        console.warn('Unknown node type');
        return null;
    }

    render() {
        const { type, color } = this.props;

        return (
            <DragWrapper type={type} color={color} style={{ display: 'inline-block' }}>
                {this.renderNode()}
            </DragWrapper>
        );
    }
}

export default class NodesPanel extends React.Component {
    render() {
        return (
            <div className='nodes-panel'>
                <div className='node-wrapper'>
                    <Node type='question' color='rgb(224, 28, 120)'/>
                </div>
                <div className='node-wrapper'>
                    <Node type='endpoint' color='rgb(224, 98, 20)' />
                </div>
            </div>
        );
    }
}
