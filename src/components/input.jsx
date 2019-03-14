import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: this.props.defaultInputValue
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultInputValue !== this.props.inputValue) {
            this.setState({
                inputValue: nextProps.defaultInputValue
            });
        }
    }

    onChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    render() {
        return (
            <input type="text"
                   name={this.props.name}
                   value={this.state.inputValue}
                   onChange={this.onChange.bind(this)} />
        )
    }
}

export default Input;