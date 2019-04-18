import React from 'react';
import Modal from 'react-responsive-modal';

class DownloadModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    onOpenModal() {
        this.setState({ open: true });
    };

    onCloseModal() {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <button className="download" onClick={this.onOpenModal.bind(this)}></button>
                <Modal open={this.state.open} onClose={this.onCloseModal.bind(this)} center>
                    <h2>Model</h2>
                    <p>
                        <textarea className="qa-model" defaultValue={this.props.data}></textarea>
                    </p>
                </Modal>
            </div>
        );
    }
}

export default DownloadModal;