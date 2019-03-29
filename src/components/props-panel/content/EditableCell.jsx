import React from 'react';

class EditableCell extends React.Component {
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

    onChange(e) {
        this.props.onChange({
            name: this.props.name,
            value: e.target.innerText
        });
    }

    render() {
        return (
            <div contentEditable="true"
                 onFocus={this.selectionHandler.bind(this)}
                 onBlur={this.onChange.bind(this)}
                 suppressContentEditableWarning={true}>
                {this.props.value}
            </div>
        );
    }
}

export default EditableCell;