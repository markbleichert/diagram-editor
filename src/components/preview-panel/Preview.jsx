import React from 'react';
import _ from 'lodash';
import { transform } from './transformer';

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'iframeLoaded') {
                this.updatePreview(this.props.model, this.props.selectedNode);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.updatePreview(nextProps.model, nextProps.selectedNode);
    }

    updatePreview(diagramModel, selectedNode) {
        const iframe = document.getElementById('preview');

        if (diagramModel.nodes.length > 0) {
            const model = transform(diagramModel, selectedNode);
            iframe.contentWindow.qa.start(model, 'qa-module');
        } else {
            const container = iframe.contentDocument.getElementById('qa-module');
            container.innerHTML = 'Empty diagram: nothing to display..';

        }
    }

    toggleWindowSize(e) {
        const element = e.target;
        const parent = element.parentElement.parentElement;

        if (element.classList.contains('is-expanded')) {
            parent.classList.remove('expanded');
            element.classList.remove('is-expanded');
        } else {
            parent.classList.add('expanded');
            element.classList.add('is-expanded');
        }

    }

    render() {
        return (
            <div className="preview-wrapper">
                <button onClick={this.toggleWindowSize.bind(this)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <iframe id="preview" name="preview" src="./preview.html" width="100%" height="100%" frameBorder="0"/>
            </div>
        )
    }
}

export default Preview;