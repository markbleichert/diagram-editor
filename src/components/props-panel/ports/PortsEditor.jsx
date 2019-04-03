import React from 'react';
import EditableCell from '../content/EditableCell';

class PortsEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    onAddPort() {
        this.props.onAdd();
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

    renderPortObjectTypes(port, props) {
        return props
            .filter((key) => ['image'].includes(key))
            .map((propName, index) => {
                const obj = port[propName];

                const rows = Object.keys(obj).map((key, index) => {
                    return (
                        <tr key={index}>
                            <th>{ key }</th>
                            <td>
                                <EditableCell
                                    name={`${propName}.${key}`}
                                    value={obj[key]}
                                    onChange={this.onChangeHandler.bind(this, port)}
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

    renderPortSimpleTypes(port, keys) {
        const rows = keys
            .filter((key) => ['label', 'value'].includes(key))
            .map((key, index) => {
            return (
                <tr key={index}>
                    <th>{ key }</th>
                    <td>
                        <EditableCell
                            name={key}
                            value={port[key]}
                            onChange={this.onChangeHandler.bind(this, port)}
                        />
                    </td>
                </tr>
            );
        });

        return (
            <table key={port.id} className="">
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    renderPort(port) {
        const objectTypes = Object.keys(port).filter((key) => typeof port[key] === 'object');
        const simpleTypes = Object.keys(port).filter((key) => typeof port[key] === 'string');

        return (
            <div className="port-container">
                { this.renderPortSimpleTypes(port, simpleTypes) }
                { this.renderPortObjectTypes(port, objectTypes) }
            </div>
        );
    }

    renderPorts(ports) {
        return ports.map((port, index) => {
            return (
                <div key={index}>{this.renderPort(port)}</div>
            );
        });
    }

    render() {
        const portsObj = this.props.data;
        const ports = Object.keys(portsObj)
            .filter((key) => !portsObj[key].in)
            .map((prop) => portsObj[prop]);

        if (ports.length > 0) {
            return (
                <div className="ports-container">
                    <div className="ports-header">
                        <label>Ports</label>
                        <button className="add-port-button"
                                onClick={this.onAddPort.bind(this)}>+</button>
                    </div>
                    { this.renderPorts(ports)}
                </div>
            );
        }

        return null;
    }
}

export default PortsEditor;