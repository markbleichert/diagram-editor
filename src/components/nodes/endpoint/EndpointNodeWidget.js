import React from 'react';
import * as RJD from '../../../../lib/main';
import { EndpointNodeModel } from './EndpointNodeModel';

export class EndpointNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
    color: 'rgb(0, 192, 255)'
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  getInPorts() {
    const { node, color, displayOnly } = this.props;
    let endpointNode = node;

    if (displayOnly) {
        endpointNode = new EndpointNodeModel(node.name, color);
    }

    return endpointNode.getInPorts ? endpointNode.getInPorts().map((port, i) => (
      <RJD.DefaultPortLabel model={port} key={`out-port-${i}`} />
    )) : [];
  }

  render() {
    const { node, displayOnly, color: displayColor } = this.props;
    const { name, color } = node;
    const style = {};
    if (color || displayColor) {
      style.background = color || displayColor;
    }

    return (
      <div className='basic-node' style={style}>
        <div className='title'>
          <div className='name'>
            {name}
          </div>
          {!displayOnly ? <div className='fa fa-close' onClick={this.onRemove.bind(this)} /> : null}
        </div>
        <div className='ports'>
          <div className='out'>
            {this.getInPorts()}
          </div>
        </div>
      </div>
    );
  }
}

export const EndpointNodeWidgetFactory = React.createFactory(EndpointNodeWidget);
