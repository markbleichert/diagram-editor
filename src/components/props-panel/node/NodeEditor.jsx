import React from 'react';
import EditableCell from '../content/EditableCell';
import ColorPicker from './ColorPicker';

class NodeEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    setObjectValue(obj, value, path) {
        let i;
        path = path.split('.');
        for (i = 0; i < path.length - 1; i++)
            obj = obj[path[i]];

        obj[path[i]] = value;
    }

    onChangeHandler(data, changeObject) {
        this.setObjectValue(data, changeObject.value, changeObject.name);
        this.props.onChange(data)
    }

    onColorChanged(key, color) {
        const data = this.props.data;
        this.setObjectValue(data, `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, key);
        this.props.onChange(data);
    }

    renderLabel(key) {
        if (key === 'color') {
            return (
                <label>
                    <span>{ key }</span>
                    <ColorPicker onChange={this.onColorChanged.bind(this, key)}/>
                </label>
            );
        }

        return (<label>{ key }</label>);
    }

    renderSimpleTypes(content, props) {
        const rows = props
            .filter((key) => ['id', 'name', 'root', 'color'].includes(key))
            .map((key, index) => {
                return (
                    <tr key={index}>
                        <th>{ this.renderLabel(key) }</th>
                        <td>
                            <EditableCell
                                name={key}
                                value={content[key]}
                                onChange={this.onChangeHandler.bind(this, content)}
                            />
                        </td>
                    </tr>
                );
        });

        return (
            <table className="">
                <thead>
                    <tr><th colSpan="2">Root</th></tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    renderRootNode(content) {
        if (content) {
            const simpleTypes = Object.keys(content)
                .filter((key) => typeof content[key] === 'string');

            return (
                <div>
                    { this.renderSimpleTypes(content, simpleTypes) }
                </div>
            );
        }

        return null;
    }

    render() {
        return (
            <div>
                { this.renderRootNode(this.props.data) }
            </div>
        )
    }
}

export default NodeEditor;