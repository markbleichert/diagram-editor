import React from 'react';


class PropsPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    parseModel() {
        return JSON.stringify(this.props.model, null, 2);
    }

    render() {
        return (
            <div className="console-panel">
                <pre>
                    {this.parseModel()}
                </pre>
            </div>
        )
    }
}

export default PropsPanel;