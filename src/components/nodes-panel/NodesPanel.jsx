import React from 'react';
import Node from './Node';

class NodesPanel extends React.Component {
    render() {
        return (
            <div className="panel-wrapper">
                <div className="nodes-panel">
                    <div className='node-wrapper'>
                        <Node type='connection' color='rgb(238, 238, 238)'/>
                    </div>
                    <div className='node-wrapper'>
                        <Node type='question' color='rgb(54, 153, 255)'/>
                    </div>
                    <div className='node-wrapper'>
                        <Node type='endpoint' color='rgb(235, 20, 76)' />
                    </div>
                </div>
            </div>
        );
    }
}

export default NodesPanel;