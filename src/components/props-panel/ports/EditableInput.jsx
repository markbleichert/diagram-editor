import React from 'react';

class EditableInput extends React.Component {
    constructor(props) {
        super(props);
    }

    selectionHandler(el) {
        var range = document.createRange();
        range.selectNodeContents(el.target);

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    render() {
        return (
            <div data-id={this.props.id}
                 data-name={this.props.name}
                 contentEditable="true"
                 onFocus={this.selectionHandler.bind(this)}
                 onBlur={this.props.onBlur}
                 suppressContentEditableWarning={true}>
                {this.props.value}
            </div>
        );
    }
}

export default EditableInput;