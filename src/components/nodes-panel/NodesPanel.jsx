import React from 'react';
import Node from './Node';

class NodesPanel extends React.Component {
    render() {
        return (
            <div className="nodes-panel">
                <div className='node-wrapper'>
                    <Node type='question' color='rgb(224, 28, 120)'/>
                </div>
                <div className='node-wrapper'>
                    <Node type='endpoint' color='rgb(0, 155, 20)' />
                </div>
            </div>
        );
    }
}

export default NodesPanel;