import React from 'react';
import { DragSource } from 'react-dnd';

const source = {
    beginDrag(props) {
        return props;
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class DragWrapper extends React.Component {
  render() {
    const { isDragging, connectDragSource, children, style } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource(
        <div style={{ ...style, opacity }}>
          {children}
        </div>
      )
    );
  }
}

export default DragSource('node-source', source, collect)(DragWrapper);