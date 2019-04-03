import React from 'react';
import DragWrapper from './DragWrapper';
import { ConnectionNodeWidget } from '../nodes/connection/ConnectionNodeWidget';
import { InputNodeWidget } from '../nodes/input/InputNodeWidget';
import { EndpointNodeWidget } from '../nodes/endpoint/EndpointNodeWidget';

class Node extends React.Component {
    renderNode() {
        const { type, color } = this.props;

        if (type === 'connection') {
            return <ConnectionNodeWidget node={{ name: 'Connection Node' }} color={color} displayOnly/>;
        }
        if (type === 'question') {
            return <InputNodeWidget node={{ name: 'QA Node' }} color={color} displayOnly/>;
        }
        if (type === 'endpoint') {
            return <EndpointNodeWidget node={{ name: 'Endpoint Node' }} color={color} displayOnly/>;
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

export default Node;