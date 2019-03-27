import React from 'react';
import EditableInput from './EditableInput';

class Port extends React.Component {

    render() {
        const { id, label, image } = this.props;

        if (this.props.id) {
            return (
                <table className="ports">
                    <tbody>
                    <tr>
                        <th>label</th>
                        <td>
                            <EditableInput
                                id={id}
                                name="label"
                                value={label}
                                onBlur={this.props.onBlur}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>image</th>
                        <td>
                            <EditableInput
                                id={id}
                                name="image"
                                value={image ? image.src : null}
                                onBlur={this.props.onBlur}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        }
        return null;
    }
};

export default Port;