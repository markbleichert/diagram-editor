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

    onChangeHandler(data, changeObject) {
        // get first data prop in object
        const objName = Object.keys(data)[0];

        // set object property with changed value
        data[objName][changeObject.name] = changeObject.value;

        // clone data prop
        const contentClone = Object.assign({}, this.props.data)

        // merge changed data with clone
        const changedContent = Object.assign(contentClone, data);

        delete changedContent.content;

        // return changed content object
        this.props.onChange(changedContent)
    }

    renderContentSimpleType(content, props) {
        const rows = props.map((key, index) => {
            const data = {
                content
            };

            return (
                <tr key={index}>
                    <th>{ key }</th>
                    <td>
                        <EditableCell
                            name={key}
                            value={content[key]}
                            onChange={this.onChangeHandler.bind(this, data)}
                        />
                    </td>
                </tr>
            );
        });

        return (
            <table className="">
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
            const data = {};
            data[propName] = obj;

            const rows = Object.keys(obj).map((key, index) => {
                return (
                    <tr key={index}>
                        <th>{ key }</th>
                        <td>
                            <EditableCell
                                name={key}
                                value={obj[key]}
                                onChange={this.onChangeHandler.bind(this, data)}
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