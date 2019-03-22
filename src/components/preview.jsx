import React from 'react';
import { transform } from './transformer';

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'iframeLoaded') {
                this.updatePreview(this.props.model);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.updatePreview(nextProps.model);
    }

    updatePreview(diagramModel) {
        if (diagramModel.nodes.length > 0) {
            const model = transform(diagramModel);
            const iframe = document.getElementById('preview');
            iframe.contentWindow.qa.start(model, 'qa-module');
        }
    }

    render() {
        return (
            <iframe id="preview" name="preview" src="./preview.html" width="100%" height="100%" frameBorder="0"/>
        )
    }
}

export default Preview;