import React from 'react';
import Modal from 'react-responsive-modal';

class DownloadModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    onOpenModal() {
        this.setState({ open: true });
    };

    onKeyDown(e) {
        e.stopPropagation();
    }

    onCloseModal() {
        this.setState({ open: false });
    };

    selectAll(e) {
        this.textArea.select();

        try {
            const ok = document.execCommand('copy');

            if (ok) {
                this.message.innerHTML = 'Copied to clipboard !';
            } else {
                this.message.innerHTML = 'Unable to copy!';
            }
        } catch (err) {
            this.message.innerHTML = 'Unsupported Browser!';
        }
    }

    render() {
        return (
            <button className="fa fa-download" onClick={this.onOpenModal.bind(this)}>
                <Modal classNames={{ modal: 'dowload-modal'}} open={this.state.open} onClose={this.onCloseModal.bind(this)} center>
                    <div className="downlad-modal-content">
                        <h2>Model</h2>
                        <p>
                            <textarea
                                ref={(el) => {this.textArea = el}}
                                className="qa-model" defaultValue={this.props.data}
                                onKeyDown={this.onKeyDown.bind(this)}>
                            </textarea>
                        </p>
                        <span ref={(el) => {this.message = el}}></span>
                        <button onClick={this.selectAll.bind(this)}>Copy</button>
                    </div>
                </Modal>
            </button>
        );
    }
}

export default DownloadModal;