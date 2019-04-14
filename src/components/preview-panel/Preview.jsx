import React from 'react';
import _ from 'lodash';
import { transform } from './transformer';

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'untitled'
        }
    }

    componentDidMount() {
        this.iframe = document.getElementById('preview');
        window.addEventListener('message', this.onIframeLoaded.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.model, this.props.model)) {
            console.log(this.props.model.nodes[0].ports[1].label);
            console.log(nextProps.model.nodes[0].ports[1].label);
            this.updatePreview(nextProps.model, nextProps.selectedNode);
        }
    }

    updateSelection(id) {
        const node = this.props.model.nodes.find((node) => node.id === id);
        this.props.updateSelectedNode(node);
    }

    updatePreview(diagramModel, selectedNode) {
        if (diagramModel.nodes.length > 0) {
            const model = transform(diagramModel, selectedNode);
            this.updateQARuntime(model);
        } else {
            this.resetIframe();
        }
    }

    onIframeLoaded(event) {
        if (event.data.type === 'iframeLoaded') {
            this.updatePreview(this.props.model, this.props.selectedNode);
            this.setState({
                title: this.iframe.contentDocument.title
            });
        }
    }

    updateQARuntime(model) {
        this.iframe.contentWindow.qa.start(model, 'qa-module', {
            onChange: (id) => this.updateSelection(id)
        });
    }

    resetIframe() {
        const container = this.iframe.contentDocument.getElementById('qa-module');
        container.innerHTML = 'Empty diagram: nothing to display..';
    }

    // @bug: do not allow from minimized to maximized
    togglePanel(className, e) {
        const parent = document.querySelector('.preview-panel');
        parent.classList.toggle(className);
    }

    render() {
        return (
            <div className="preview-wrapper">
                <div className="wc-box">
                    <span className="title">{ this.state.title }</span>
                    <span className="spacer"></span>
                    <div className="minimize" onClick={this.togglePanel.bind(this, 'minimized')}></div>
                    <div className="maximize" onClick={this.togglePanel.bind(this, 'expanded')}></div>
                    <div className="close"></div>
                </div>
                <iframe id="preview" name="preview" src="./preview.html" width="100%" height="100%" frameBorder="0"/>
            </div>
        )
    }
}

export default Preview;