import React from 'react';
import DragWrapper from './DragWrapper';

function Draggable({ connectDragSource, isDragging }) {
    return (
        <DragWrapper type="simple">
            <div className="draggable">Simple Type</div>
        </DragWrapper>
    );
}

export default Draggable;