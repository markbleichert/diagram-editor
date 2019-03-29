import React from 'react';
import { TwitterPicker } from 'react-color';

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false,
        };
    }

    handleClick() {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        });
    }

    handleClose() {
        this.setState({
            displayColorPicker: false
        });
    }

    onColorChanged(color) {
        this.props.onChange(color)
    }

    renderPicker() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
        };

        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        };

        return (
            <div style={popover}>
                <div style={cover} onClick={this.handleClose.bind(this)}/>
                <TwitterPicker
                    onChange={this.onColorChanged.bind(this)}/>
            </div>
        );
    }

    render() {
        return (
            <span className="color-picker">
                <button onClick={ this.handleClick.bind(this) }>...</button>
                { this.state.displayColorPicker ? this.renderPicker() : null }
            </span>
        );
    }
}

export default ColorPicker;