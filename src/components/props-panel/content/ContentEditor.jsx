import React from 'react';
import EditableCell from './EditableCell';

class ContentEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    renderContent(content) {
        if (content) {
            const objectTypes = Object.keys(content).filter((key) => typeof content[key] === 'object');
            const simpleTypes = Object.keys(content).filter((key) => typeof content[key] === 'string');

            return (
                <div>
                    { this.renderContentSimpleType(content, simpleTypes) }
                    { this.renderContentObjectType(content, objectTypes) }
                </div>
            );
        }

        return null;
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

    renderContentSimpleType(content, props) {
        const rows = props.map((key, index) => {
            return (
                <tr key={index}>
                    <th>{ key }</th>
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
            <table className="root">
                <thead>
                    <tr><th colSpan="2">content</th></tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    renderContentObjectType(content, props) {
        return props.map((propName, index) => {
            const obj = content[propName];

            const rows = Object.keys(obj).map((key, index) => {
                return (
                    <tr key={index}>
                        <th>{ key }</th>
                        <td>
                            <EditableCell
                                name={`${propName}.${key}`}
                                value={obj[key]}
                                onChange={this.onChangeHandler.bind(this, content)}
                            />
                        </td>
                    </tr>
                );
            });

            return (
                <div key={index} className="indent">
                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">{ propName }</th>
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                { this.renderContent(this.props.data) }
            </div>
        )
    }
}

export default ContentEditor;